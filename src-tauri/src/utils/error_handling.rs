use crate::types::{BaseFailedResponse, BasicError};
use chrono::Utc;

/// Creates a network error response
pub fn create_network_error(error: reqwest::Error) -> BaseFailedResponse {
    BaseFailedResponse {
        code: 500,
        error: BasicError {
            code: "NETWORK_ERROR".to_string(),
            message: error.to_string(),
        },
        status: "error".to_string(),
        timestamp: Utc::now().to_string(),
    }
}

/// Creates a parse error response
pub fn create_parse_error(error: reqwest::Error) -> BaseFailedResponse {
    BaseFailedResponse {
        status: "error".to_string(),
        code: 500,
        timestamp: Utc::now().to_string(),
        error: BasicError {
            code: "PARSE_ERROR".to_string(),
            message: error.to_string(),
        },
    }
}

/// Creates a JSON parse error response
pub fn create_json_parse_error(error: serde_json::Error) -> BaseFailedResponse {
    BaseFailedResponse {
        status: "error".to_string(),
        code: 500,
        timestamp: Utc::now().to_string(),
        error: BasicError {
            code: "JSON_PARSE_ERROR".to_string(),
            message: error.to_string(),
        },
    }
}

/// Handles API error responses by trying to parse them first, then falling back to raw response
pub async fn handle_api_error_response(response: reqwest::Response) -> BaseFailedResponse {
    let status_code = response.status().as_u16();

    let error_text = response
        .text()
        .await
        .unwrap_or_else(|_| "Unknown error".to_string());

    // Try to parse as BaseFailedResponse first
    if let Ok(api_error) = serde_json::from_str::<BaseFailedResponse>(&error_text) {
        api_error
    } else {
        // If parsing fails, create error with actual response data
        BaseFailedResponse {
            status: "error".to_string(),
            code: status_code as u32,
            timestamp: Utc::now().to_string(),
            error: BasicError {
                code: status_code.to_string(),
                message: error_text,
            },
        }
    }
}

/// Extracts error message from API error for user display
pub fn extract_error_message(api_error: BaseFailedResponse) -> String {
    api_error.error.message
}
