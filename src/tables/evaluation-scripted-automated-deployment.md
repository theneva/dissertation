| Criterion | Description | Unit | Scripted automated
| -------------- | ------------------------------------ | ----------------- | ---------- |
| Testability | Can the service efficiently be automatically tested on unit, module, and feature level? | (Simple, Mocked dependencies) | Mocked dependencies
| Complete automation feasibility | No hard requirement of any manual steps in the deployment process. Covers developer productivity. | True? | True
| Monitorability | Can traffic and requests be monitored throughout the system and visualised with dashboards? | (Simple, Feasible, Unfeasible) | Simple
| Resource scaling | Can the system be manually scaled horizontally and vertically to account for current load? | (Simple, Horizontal only, Vertical only, Manual) | Manual
| Automatic scaling | Can the system be automatically scaled by monitoring load? | True? |
| Monetary costs | Does the deployment strategy cost money beyond computing resources? | (None, One-time payment, Recurring expenses) | None
| Multi-target deployment support | Can the system be deployed to both self-hosted machines and cloud providers? | True? | True
| Dev/prod parity | Can the development and production environments be equal? | (Divergent, Similar, Equal) | Similar at best, but potentially equal on the build server
| Configuration code LOC | How much code must be written to enable deployment for a new service? | (None, Low, Moderate, High) | High
| Steps to deploy | How many manual steps are required to singly deploy a compiled service to a host? | Step count (integer) | 0
| Modifiability | How much code must be written to modify the configuration? | (None, Low, Moderate, High) | High (linearly proportional to service count)
| Cluster scale | How are manual steps and time to deploy proportional to the number of target hosts? | (Linear growth; Constant increase) | Constant increase
| Time to deploy | How long does it take to singly deploy a change to a host? | (Seconds; Few minutes; Several minutes; Hours) | Seconds (given no queue)
| Learning curve | How much effort is required to use the deployment configuration? | (Difficult, Moderate, Simple) | Moderate
| Retention | To which extent is the deployment configuration simple enough to recall, rather than re-learn? | (Low, Moderate, High) | Moderate
| DevOps efficacy | Can developers safely deploy their own changes to production? | True? | True
| Self-documenting configuration | To which extent does the configuration code itself double as documentation of the non-functional requirements that led to the configuration, eliminating the need to document these elsewhere? | True? | True (to some extent)
| Only twelve factors | How many ASRs are imposed on the service beyond following the guidelines known as The Twelve-Factor App? | (Many, Few, None) | None
| Same-host duplicates | Can multiple instances and versions of the same service run on a single host? | (Simple, With custom configuration, Unfeasible) | With custom configuration

Table: Framework evaluation of scripted automated deployment
