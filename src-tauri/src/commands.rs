use crate::store::{Session, SessionStore};
use crate::types::OtpData;
use crate::utils::auth_utils::{
    handle_otp_request, handle_otp_verification, handle_refresh_session,
};
use tauri::State;

#[tauri::command]
pub async fn request_otp(email: String, password: String) -> Result<OtpData, String> {
    handle_otp_request(email, password).await
}

#[tauri::command]
pub async fn refresh_otp(refresh_token: String) -> Result<crate::types::Tokens, String> {
    handle_refresh_session(refresh_token).await
}

#[tauri::command]
pub async fn verify_otp(
    email: String,
    otp: String,
    request_id: String,
    session_store: State<'_, SessionStore>,
) -> Result<Session, String> {
    let session_store = session_store.inner().clone();
    handle_otp_verification(email, otp, request_id, session_store).await
}

#[tauri::command]
pub async fn logout(session_store: State<'_, SessionStore>) -> Result<String, String> {
    let session_store = session_store.inner().clone();
    let mut store = session_store.lock().unwrap();
    *store = None;
    Ok("Logged out successfully".to_string())
}

#[tauri::command]
pub async fn get_current_session(
    session_store: State<'_, SessionStore>,
) -> Result<Option<Session>, String> {
    let session_store = session_store.inner().clone();
    let store = session_store.lock().unwrap();
    Ok(store.clone())
}

#[tauri::command]
pub async fn is_authenticated(session_store: State<'_, SessionStore>) -> Result<bool, String> {
    let session_store = session_store.inner().clone();
    let store = session_store.lock().unwrap();
    Ok(store.is_some())
}

// Frontend logging commands
#[tauri::command]
pub async fn log_debug(message: String) -> Result<(), String> {
    println!("🔍 [FRONTEND DEBUG] {}", message);
    Ok(())
}

#[tauri::command]
pub async fn log_info(message: String) -> Result<(), String> {
    println!("ℹ️ [FRONTEND INFO] {}", message);
    Ok(())
}

#[tauri::command]
pub async fn log_error(message: String) -> Result<(), String> {
    println!("❌ [FRONTEND ERROR] {}", message);
    Ok(())
}

#[tauri::command]
pub async fn log_warn(message: String) -> Result<(), String> {
    println!("⚠️ [FRONTEND WARN] {}", message);
    Ok(())
}
