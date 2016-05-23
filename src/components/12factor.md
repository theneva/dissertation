The Twelve-Factor App methodology is a set of twelve guidelines that aim to:

- transparentise configuration to reduce the effort required by new developers to understand the setup;
- maximise portability between execution environments;
- simplify deployment, particularly to a cloud environment;
- enable continuous delivery by separating development and production; and
- allow scaling a service without significant changes.

The guidelines are all attempts at establishing _best practices_, and are independent of programming language and execution environment. In a microservice context, the twelve factors can all be argued to be useful. This makes the factors a useful set of reasonable expectations for the architecture of a service.

The rest of this subchapter summarises the twelve factors based on their descriptions on the Twelve-Factor App website^[http://12factor.net], and briefly discusses their relevance to the microservice architecture and cloud computing.

The first factor, _Codebase_^[http://12factor.net/codebase], states that any one service should be contained in exactly one codebase, tracked with revision control such as Git. This one code base should be built once, and deployed to all required environments. Deploying the very same build is important, in order to be certain that it will behave in the same way across all environments [@newman:building-microservices:2015]. This factor is visualised in Figure @fig:codebase-model, reproduced from http://12factor.net/codebase.

![Codebase model reproduced from http://12factor.net/codebase](http://12factor.net/images/codebase-deploys.png){#fig:codebase-model width=50%}

The second factor, _Dependencies_, states that dependencies (i.e., third party libraries) should be explicitly declared and isolated. A twelve-factor app cannot depend on a system-wide package being available on the underlying operating system. If the service requires an external service, it must be bundled into the artefact. This increases flexibility towards deployment target, especially in a _Platform as a Service_ context, where the developer has little control over the underlying infrastructure.

Factor number three, _Config_, states that configuration must be stored in the environment. This is a key enabler of multiple environments (e.g., testing and production), as configuration such as remote IP addresses, credentials, and logging configuration may differ between each environment.

Factor four, _Backing services_, states that the service makes no distinction between third party services and internally managed services such as data stores. Configuration for access to and authentication with these services is stored in the Config. This process is visualised in Figure @fig:attached-resources, reproduced from http://12factor.net/backing-services.

![Communication with backing services, reproduced from http://12factor.net/backing-services](http://12factor.net/images/attached-resources.png){#fig:attached-resources width=50%}

Factor five, _Build, release, run_, recommends a strict separation of the _build_ and _run_ stages for the service. This separation is a vital enabler of building a single artefact and advancing it through the environments, eventually reaching production.

The sixth factor, _Processes_, states that the app should be executed as one or more stateless processes. As the app itself is stateless, all data that should be loaded or persisted must be fetched from or sent to a Backing service such as a database.

Factor seven, _Port binding_, regards exporting services via port binding. As a twelve-factor service is autonomous, it provides its own capabilities for listening to HTTP requests (or similar), and exposes a single port for communication.

Factor eight, _Concurrency_, states that scaling must be done in a way that allows spanning multiple processes running on multiple physical machines.

Factor nine, _Disposability_, requires the service's processes to handle being started or stopped at immediate notice and minimise time to start. This enables rapid scaling both up and down to meet requirements from immediate server load.

Factor ten, _Dev/prod parity_, states that all environments the built service is passed through must be as similar as possible. If the developer's local environment differs from the production environment by, for example, running a different operating system, unexpected behaviour may occur. In context of Continuous Delivery, bridging the this tool gap is particularly important, as a faulty deployment can behave unexpectedly in only a single environment. If it happens to affect only the production environment, the service may at worst stop responding altogether.

Factor eleven, _Logs_, states that logs should be treated as event streams. A twelve-factor app is stateless and does not concern itself with storage of data, including logs, so the logs should instead simply be written to the standard output. The log output should be captured by the execution environment and routed to its final destination, such as services for monitoring and archiving logs. In a microservice context, this strategy avoids log file collisions, as well as the common issue of production servers having their disks filled by log files.

The final factor, _Admin processes_, states that management tasks such as database migrations should be run as one-off processes with elevated privileges, shutting down as soon as possible.

The Twelve-Factor app guidelines are simply a collection of best practises based on the authoring developers' own experiences combined with well-established architectural concerns. Following these guidelines generally makes the code base simpler and more flexible in terms of deployment configuration.
