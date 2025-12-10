use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BaseSuccessResponse<Data> {
    pub status: String,
    pub code: u32,
    pub message: String,
    pub timestamp: String,
    pub data: Data,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct BaseFailedResponse<E = BasicError> {
    pub status: String,
    pub code: u32,
    pub timestamp: String,
    pub error: E,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct BasicError {
    pub code: String,
    pub message: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct OtpData {
    pub email: String,
    #[serde(rename = "requestId")]
    pub request_id: String,
    #[serde(rename = "requiresOtp")]
    pub requires_otp: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct LoginData {
    pub admin: AdminData,
    #[serde(flatten)]
    pub tokens: Tokens,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AdminData {
    pub id: String,
    pub email: String,
    #[serde(rename = "firstName")]
    pub first_name: String,
    #[serde(rename = "lastName")]
    pub last_name: String,
    #[serde(rename = "fullName")]
    pub full_name: String,
    pub role: String,
    pub status: String,
    pub permissions: Vec<String>,
    #[serde(rename = "lastLoginAt")]
    pub last_login_at: String,
    #[serde(rename = "createdAt")]
    pub created_at: String,
    #[serde(rename = "updatedAt")]
    pub updated_at: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Tokens {
    #[serde(rename = "accessToken")]
    pub access_token: String,
    #[serde(rename = "refreshToken", default)]
    pub refresh_token: String,
    #[serde(rename = "expiresIn")]
    pub expires_in: u32,
    #[serde(rename = "accessTokenExpiresIn")]
    pub access_token_expires_in: String,
    #[serde(rename = "refreshTokenExpiresIn")]
    pub refresh_token_expires_in: String,
}
