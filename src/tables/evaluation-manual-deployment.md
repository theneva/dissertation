| Criterion | Description | Unit | Manual deploy 
| -------------- | ------------------------------------ | ----------------- | ---------- |
| Testability | Can the service efficiently be automatically tested on unit, module, and feature level? | (Simple, Mocked dependencies) | Mocked dependencies
| Complete automation feasibility | No hard requirement of any manual steps in the deployment process. Covers developer productivity. | True? |
| Monitorability | Can traffic and requests be monitored throughout the system and visualised with dashboards? | (Simple, Feasible, Unfeasible) | Simple
| Resource scaling | Can the system be manually scaled horizontally and vertically to account for current load? | (Simple, Horizontal only, Vertical only, Manual) | Manual
| Automatic scaling | Can the system be automatically scaled by monitoring load? | True? |
| Monetary costs | Does the deployment strategy cost money beyond computing resources? | (None, One-time payment, Recurring expenses) | None
| Multi-target deployment support | Can the system be deployed to both self-hosted machines and cloud providers? | True? | True
| Dev/prod parity | Can the development and production environments be equal? | (Divergent, Similar, Equal) | Similar at best
| Configuration code LOC | How much code must be written to enable deployment for a new service? | (None, Low, Moderate, High) | None
| Steps to deploy | How many manual steps are required to perform a single deployment? | Step count (integer) | 7 (compiled service)
| Modifiability | How much code must be written to modify the configuration? | (None, Low, Moderate, High) | None
| Time to deploy | How long does it take to deploy a change? | (Seconds, Few minutes, Several minutes, Hours) | Few minutes to a single host, repeated per host
| Learning curve | How much effort is required to use the deployment configuration? | (Difficult, Moderate, Simple) | Simple
| Retention | To which extent is the deployment configuration simple enough to recall, rather than re-learn? | (Low, Moderate, High) | High
| DevOps efficacy | Can developers safely deploy their own changes to production? | True? |
| Self-documenting configuration | To which extent does the configuration code itself double as documentation of the non-functional requirements that led to the configuration, eliminating the need to document these elsewhere? | True? |
| Only twelve factors | How many ASRs are imposed on the service beyond following the guidelines known as The Twelve-Factor App? | (Many, Few, None) | None
| Same-host duplicates | Can multiple instances and versions of the same service run on a single host? | (Simple, With custom configuration, Unfeasible) | With custom configuration

Table: Framework evaluation of manual deployment
