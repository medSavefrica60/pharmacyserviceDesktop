use serde::{Deserialize, Serialize};
use std::sync::{Arc, Mutex};

use crate::types::{AdminData, Tokens};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Session {
    pub user: AdminData,
    pub tokens: Tokens,
}

pub type SessionStore = Arc<Mutex<Option<Session>>>;

pub fn init_session_store() -> SessionStore {
    Arc::new(Mutex::new(None))
}
