use crate::api::{ApiClient, ApiConfig, LoginRequest, TokenRefreshRequest};
use crate::store::{self, Session};
use crate::types::{OtpData, Tokens};
use crate::utils::error_handling::extract_error_message;
use tauri::AppHandle;

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

pub async fn handle_refresh_session(
    refresh_token: String,
    app: AppHandle,
) -> Result<Tokens, String> {
    println!("🔄 [HANDLE_REFRESH] Starting refresh session handler...");
    println!(
        "🔄 [HANDLE_REFRESH] Refresh token length: {}",
        refresh_token.len()
    );

    let api_config = ApiConfig::default();
    println!("🔄 [HANDLE_REFRESH] API Base URL: {}", api_config.base_url);
    let api_client = ApiClient::new(api_config);

    let api_request = TokenRefreshRequest {
        refresh_token: refresh_token.clone(),
    };

    // Log the request details before making the call
    println!("🔄 [HANDLE_REFRESH] Preparing API request...");
    println!(
        "   - Refresh token (first 20 chars): {}...",
        if refresh_token.len() > 20 {
            &refresh_token[..20]
        } else {
            &refresh_token
        }
    );
    println!("🔄 [HANDLE_REFRESH] Calling API to refresh tokens...");
    match api_client.refresh_session(api_request).await {
        Ok(data) => {
            println!("✅ [HANDLE_REFRESH] API call successful");
            println!("   - Response status: {}", data.status);

            if data.status == "success" {
                let new_tokens = data.data;
                println!("✅ [HANDLE_REFRESH] Got new tokens from API");
                println!(
                    "   - Access token length: {}",
                    new_tokens.access_token.len()
                );
                println!(
                    "   - Refresh token length: {}",
                    new_tokens.refresh_token.len()
                );

                // Get the existing session to preserve user data
                println!("🔄 [HANDLE_REFRESH] Getting existing session to preserve user data...");
                let previous_session = match store::get_session(&app) {
                    Ok(session) => session,
                    Err(e) => {
                        println!("❌ [HANDLE_REFRESH] Failed to get session: {}", e);
                        return Err(format!("Failed to get session: {}", e));
                    }
                };

                // Update session with new tokens while preserving user data
                match previous_session {
                    Some(mut session) => {
                        println!(
                            "✅ [HANDLE_REFRESH] Found existing session for user: {}",
                            session.user.email
                        );
                        println!("🔄 [HANDLE_REFRESH] Updating session with new tokens...");

                        // Update only the tokens, keep the user data
                        session.tokens = new_tokens.clone();

                        match store::save_session(&app, &session) {
                            Ok(_) => {
                                println!("✅ [HANDLE_REFRESH] Successfully saved updated session");
                            }
                            Err(e) => {
                                println!("❌ [HANDLE_REFRESH] Failed to save session: {}", e);
                                return Err(format!("Failed to save session: {}", e));
                            }
                        }
                    }
                    None => {
                        println!("❌ [HANDLE_REFRESH] No existing session found to refresh");
                        return Err("No existing session found to refresh".to_string());
                    }
                }

                println!("✅ [HANDLE_REFRESH] Token refresh completed successfully");
                Ok(new_tokens)
            } else {
                println!(
                    "❌ [HANDLE_REFRESH] API returned non-success status: {}",
                    data.message
                );
                Err(data.message)
            }
        }
        Err(error) => {
            let error_message = extract_error_message(error);
            println!("❌ [HANDLE_REFRESH] API call failed: {}", error_message);
            Err(error_message)
        }
    }
}

/// Handles OTP verification business logic
pub async fn handle_otp_verification(
    app: AppHandle,
    email: String,
    otp: String,
    request_id: String,
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

                // Store the session persistently
                store::save_session(&app, &session)?;

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
