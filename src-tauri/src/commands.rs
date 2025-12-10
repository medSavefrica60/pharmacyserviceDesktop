use crate::store::{self, Session};
use crate::types::OtpData;
use crate::utils::auth_utils::{
    handle_otp_request, handle_otp_verification, handle_refresh_session,
};
use tauri::AppHandle;

#[tauri::command]
pub async fn request_otp(email: String, password: String) -> Result<OtpData, String> {
    handle_otp_request(email, password).await
}

#[tauri::command]
pub async fn refresh_otp(
    app: AppHandle,
    refresh_token: String,
) -> Result<crate::types::Tokens, String> {
    handle_refresh_session(refresh_token, app).await
}

#[tauri::command]
pub async fn token_refresh(app: AppHandle) -> Result<crate::types::Tokens, String> {
    println!("🔄 [TOKEN_REFRESH] Starting token refresh...");

    // Get the current session to extract the refresh token
    println!("🔄 [TOKEN_REFRESH] Getting current session from store...");
    let session = match store::get_session(&app) {
        Ok(Some(session)) => {
            println!(
                "✅ [TOKEN_REFRESH] Session found for user: {}",
                session.user.email
            );
            session
        }
        Ok(None) => {
            println!("❌ [TOKEN_REFRESH] No session found in store");
            return Err("No session found".to_string());
        }
        Err(e) => {
            println!("❌ [TOKEN_REFRESH] Error getting session: {}", e);
            return Err(format!("Failed to get session: {}", e));
        }
    };

    let refresh_token = session.tokens.refresh_token.clone();
    println!(
        "🔄 [TOKEN_REFRESH] Extracted refresh token (length: {})",
        refresh_token.len()
    );
    println!("🔄 [TOKEN_REFRESH] Calling handle_refresh_session...");

    match handle_refresh_session(refresh_token, app).await {
        Ok(tokens) => {
            println!("✅ [TOKEN_REFRESH] Successfully refreshed tokens");
            println!(
                "   - New access token length: {}",
                tokens.access_token.len()
            );
            println!(
                "   - New refresh token length: {}",
                tokens.refresh_token.len()
            );
            Ok(tokens)
        }
        Err(e) => {
            println!("❌ [TOKEN_REFRESH] Error refreshing tokens: {}", e);
            Err(e)
        }
    }
}

#[tauri::command]
pub async fn verify_otp(
    app: AppHandle,
    email: String,
    otp: String,
    request_id: String,
) -> Result<Session, String> {
    handle_otp_verification(app, email, otp, request_id).await
}

#[tauri::command]
pub async fn logout(app: AppHandle) -> Result<String, String> {
    store::clear_session(&app)?;
    Ok("Logged out successfully".to_string())
}

#[tauri::command]
pub async fn get_current_session(app: AppHandle) -> Result<Option<Session>, String> {
    store::get_session(&app)
}

#[tauri::command]
pub async fn is_authenticated(app: AppHandle) -> Result<bool, String> {
    store::has_session(&app)
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
