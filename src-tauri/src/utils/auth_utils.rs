use crate::api::{ApiClient, ApiConfig, LoginRequest, TokenRefreshRequest};
use crate::store::{Session, SessionStore};
use crate::types::{OtpData, Tokens};
use crate::utils::error_handling::extract_error_message;

/// Handles OTP request business logic
pub async fn handle_otp_request(email: String, password: String) -> Result<OtpData, String> {
    let api_config = ApiConfig::default();
    let api_client = ApiClient::new(api_config);

    let api_request = LoginRequest {
        email: email.clone(),
        password,
    };

    match api_client.request_otp(api_request).await {
        Ok(api_response) => {
            if api_response.status == "success" {
                let otp_data = api_response.data;
                Ok(otp_data)
            } else {
                Err(api_response.message)
            }
        }
        Err(api_error) => {
            let error_message = extract_error_message(api_error);
            Err(error_message)
        }
    }
}

pub async fn handle_refresh_session(refresh_token: String) -> Result<Tokens, String> {
    let api_config = ApiConfig::default();
    let api_client = ApiClient::new(api_config);

    let api_request = TokenRefreshRequest {
        refresh_token: refresh_token.clone(),
    };

    match api_client.refresh_session(api_request).await {
        Ok(data) => {
            if data.status == "success" {
                let token = data.data;
                Ok(token)
            } else {
                Err(data.message)
            }
        }
        Err(error) => {
            let error_message = extract_error_message(error);
            Err(error_message)
        }
    }
}

/// Handles OTP verification business logic
pub async fn handle_otp_verification(
    email: String,
    otp: String,
    request_id: String,
    session_store: SessionStore,
) -> Result<Session, String> {
    let api_config = ApiConfig::default();
    let api_client = ApiClient::new(api_config);

    let api_request: serde_json::Value = serde_json::json!({
        "email": email,
        "code": otp,
        "requestId": request_id,
    });

    match api_client.verify_otp(api_request).await {
        Ok(api_response) => {
            if api_response.status == "success" {
                let login_data = api_response.data;

                let session = Session {
                    user: login_data.admin.clone(),
                    tokens: login_data.tokens.clone(),
                };

                // Store the session
                {
                    let mut store = session_store.lock().unwrap();
                    *store = Some(session.clone());
                }

                Ok(session)
            } else {
                Err(api_response.message)
            }
        }
        Err(api_error) => {
            let error_message = extract_error_message(api_error);
            Err(error_message)
        }
    }
}
