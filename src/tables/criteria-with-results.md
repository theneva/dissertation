| &nbsp; | Manual, traditional deployment | Containers (Docker) | Virtual machine image | Script-based |
| ---------------------------------------- | ----------- | ---------- | --------- | -------- |
| No ASRs beyond 12-factor app                                                            | x | x | x |   |
| Configuration as documentation of non-functional requirements                           |   | x |   |   |
| No collision with other services on the same virtual host (e.g., shared database)       |   | x | x |   |
| Flexible resource dedication                                                            |(x)| x |   | x |
| Same-host duplicates
| Load balance-able???
| Initial learning curve (consistent with findings of TODO REFERENCE HERE)
| Shared data between services(?)
| Ease of change deployment
| PaaS deployment
| Application start time (including boot)

Table: Criteria with results
