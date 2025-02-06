# Superset embedded dashboard
Simple example showing how to use the [superset-embedded-sdk](https://www.npmjs.com/package/@superset-ui/embedded-sdk) to authenticate with a signed JWT and embed a dashboard on a public page.

## Superset setup
Update your Superset config with the following:

```python
from superset.config import TALISMAN_CONFIG

GUEST_ROLE_NAME = "EmbeddedDashboard"
GUEST_TOKEN_JWT_SECRET = "something_super_secret_with_lots_of_entropy"
GUEST_TOKEN_JWT_AUDIENCE = "superset"

# Allow the iframe to load the Superset dashboard content
csp_config = TALISMAN_CONFIG.get("content_security_policy", {})
csp_config["frame-ancestors"] = ["'self'", "localhost:3000"]
TALISMAN_CONFIG["content_security_policy"] = csp_config

FEATURE_FLAGS = {
    "EMBEDDED_SUPERSET": True,
}

# Add the custom role with permission to load the dashboard
FAB_ROLES = {
    "EmbeddedDashboard": [
        ["all_datasource_access", "all_datasource_access"], # Highly permissive - this can be scoped down
        ["Chart", "can_read"],
        ["Dashboard", "can_read"],
        ["Row Level Security", "can_read"],
        ["RowLevelSecurity", "can_read"],
        ["SecurityRestApi", "can_grant_guest_token"],
        ["SecurityRestApi", "can_read"],
        ["Superset", "can_dashboard"],
    ]
}
```


## Run
```sh
cp .env.example .env 

# Add your secrets to .env

npm install
npm start
```