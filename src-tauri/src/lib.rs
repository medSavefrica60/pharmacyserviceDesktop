mod api;
mod commands;
mod store;
mod types;
mod utils;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            commands::request_otp,
            commands::verify_otp,
            commands::refresh_otp,
            commands::token_refresh,
            commands::logout,
            commands::get_current_session,
            commands::is_authenticated,
            commands::log_debug,
            commands::log_info,
            commands::log_error,
            commands::log_warn,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
