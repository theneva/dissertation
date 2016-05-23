| Criterion | Unit | Manual | Scripted automated
| ------------------- | ----------------- | --------------- | ---------------
| Testability | (Simple, Mocked dependencies) | Mocked dependencies | Mocked dependencies
| Complete automation feasibility | True? | | True
| Monitorability | (Simple, Feasible, Unfeasible) | Simple | Simple
| Resource scaling | (Simple, Horizontal only, Vertical only, Manual) | Manual | Manual
| Automatic scaling | True? | |
| Monetary costs | (None, One-time payment, Recurring expenses) | None | None
| Multi-target deployment support | True? | True | True
| Dev/prod parity | (Divergent, Similar, Equal) | Similar at best | Similar at best, but potentially equal on the build server
| Configuration code LOC | (None, Low, Moderate, High) | None | High
| Steps to deploy | Step count (integer) | 7 (compiled service) | 0
| Modifiability | (None, Low, Moderate, High) | None | High (linearly proportional to service count)
| Cluster scale | (Linear growth; Constant increase) | Linear growth | Constant increase
| Time to deploy | (Seconds; Few minutes; Several minutes; Hours) | Few minutes to a single host
| Learning curve | (Difficult, Moderate, Simple) | Simple | Moderate
| Retention | (Low, Moderate, High) | High | Moderate
| DevOps efficacy | True? | | True
| Self-documenting configuration | True? | | True (to some extent)
| Only twelve factors | (Many, Few, None) | None | None
| Same-host duplicates | (Simple, With custom configuration, Unfeasible) | With custom configuration | With custom configuraion

Table: Comparison of manual and scripted automated deployment strategies using the framework {#tbl:framework-comparison}
