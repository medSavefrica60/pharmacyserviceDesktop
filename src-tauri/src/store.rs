use serde::{Deserialize, Serialize};
use serde_json::json;
use tauri::AppHandle;
use tauri_plugin_store::StoreExt;

use crate::types::{AdminData, Tokens};

const STORE_FILE: &str = "session.json";
const SESSION_KEY: &str = "session";

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Session {
    pub user: AdminData,
    pub tokens: Tokens,
}

/// Save session to persistent store
pub fn save_session(app: &AppHandle, session: &Session) -> Result<(), String> {
    let store = app.store(STORE_FILE).map_err(|e| e.to_string())?;
    store.set(SESSION_KEY, json!(session));
    store.save().map_err(|e| e.to_string())?;
    Ok(())
}

/// Get session from persistent store
pub fn get_session(app: &AppHandle) -> Result<Option<Session>, String> {
    let store = app.store(STORE_FILE).map_err(|e| e.to_string())?;

    match store.get(SESSION_KEY) {
        Some(value) => {
            let session: Session =
                serde_json::from_value(value.clone()).map_err(|e| e.to_string())?;
            Ok(Some(session))
        }
        None => Ok(None),
    }
}

/// Clear session from persistent store
pub fn clear_session(app: &AppHandle) -> Result<(), String> {
    let store = app.store(STORE_FILE).map_err(|e| e.to_string())?;
    store.delete(SESSION_KEY);
    store.save().map_err(|e| e.to_string())?;
    Ok(())
}

/// Check if session exists
pub fn has_session(app: &AppHandle) -> Result<bool, String> {
    let store = app.store(STORE_FILE).map_err(|e| e.to_string())?;
    Ok(store.has(SESSION_KEY))
}
