use crate::types::{BaseFailedResponse, BaseSuccessResponse, OtpData};
use crate::utils::api_utils::{make_post_request, make_put_request};
use serde::{Deserialize, Serialize};
use std::fmt::Debug;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ApiConfig {
    pub base_url: String,
    pub api_key: Option<String>,
    pub timeout_seconds: u64,
}

impl Default for ApiConfig {
    fn default() -> Self {
        Self {
            base_url: "https://medsave-backend.onrender.com/api/v1".to_string(),
            // base_url: "http://localhost:8080/api/v1".to_string(),
            api_key: None,
            timeout_seconds: 3000,
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct LoginRequest {
    pub email: String,
    pub password: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct TokenRefreshRequest {
    #[serde(rename = "refreshToken")]
    pub refresh_token: String,
}

pub struct ApiClient {
    pub client: reqwest::Client,
    config: ApiConfig,
}

impl ApiClient {
    pub fn new(config: ApiConfig) -> Self {
        let client = reqwest::Client::builder()
            .timeout(std::time::Duration::from_secs(config.timeout_seconds))
            .build()
            .expect("Failed to create HTTP client");

        Self { client, config }
    }

    pub async fn request_otp(
        &self,
        request: LoginRequest,
    ) -> Result<BaseSuccessResponse<OtpData>, BaseFailedResponse> {
        let url = format!("{}/admin/auth/sessions", self.config.base_url);
        make_post_request(&self, &url, &request).await
    }

    pub async fn verify_otp(
        &self,
        request: serde_json::Value,
    ) -> Result<BaseSuccessResponse<crate::types::LoginData>, BaseFailedResponse> {
        let url = format!("{}/admin/auth/sessions/verify", self.config.base_url);
        make_post_request(&self, &url, &request).await
    }

    pub async fn refresh_session(
        &self,
        request: TokenRefreshRequest,
    ) -> Result<BaseSuccessResponse<crate::types::Tokens>, BaseFailedResponse> {
        let url: String = format!("{}/admin/auth/sessions", self.config.base_url);
        make_put_request(&self, &url, &request).await
    }
}
