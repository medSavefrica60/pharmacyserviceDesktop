use crate::api::ApiClient;
use crate::types::{BaseFailedResponse, BaseSuccessResponse};
use crate::utils::error_handling::{
    create_json_parse_error, create_network_error, create_parse_error, handle_api_error_response,
};

/// Makes a POST request and handles the response
pub async fn make_post_request<T, R>(
    client: &ApiClient,
    url: &str,
    request: &T,
) -> Result<BaseSuccessResponse<R>, BaseFailedResponse>
where
    T: serde::Serialize + std::fmt::Debug,
    R: serde::de::DeserializeOwned + std::fmt::Debug,
{
    let response = client
        .client
        .post(url)
        .header("Content-Type", "application/json")
        .json(request)
        .send()
        .await
        .map_err(|e| create_network_error(e))?;

    if response.status().is_success() {
        let response_text = response.text().await.map_err(|e| create_parse_error(e))?;

        let success_response: BaseSuccessResponse<R> =
            serde_json::from_str(&response_text).map_err(|e| create_json_parse_error(e))?;

        Ok(success_response)
    } else {
        let error = handle_api_error_response(response).await;
        Err(error)
    }
}

pub async fn make_put_request<T, R>(
    client: &ApiClient,
    url: &str,
    request: &T,
) -> Result<BaseSuccessResponse<R>, BaseFailedResponse>
where
    T: serde::Serialize + std::fmt::Debug,
    R: serde::de::DeserializeOwned + std::fmt::Debug,
{
    let response = client
        .client
        .put(url)
        .header("Content-Type", "application/json")
        .json(request)
        .send()
        .await
        .map_err(|e| create_network_error(e))?;

    if response.status().is_success() {
        let response_text = response.text().await.map_err(|e| create_parse_error(e))?;

        let success_response: BaseSuccessResponse<R> =
            serde_json::from_str(&response_text).map_err(|e| create_json_parse_error(e))?;

        Ok(success_response)
    } else {
        let error = handle_api_error_response(response).await;
        Err(error)
    }
}
