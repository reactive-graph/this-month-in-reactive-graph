# This Month in Reactive Graph (2024-08-31)

## Extended the Rust GraphQL Client

* This step is important to make Reactive Graph more useful and accessible, since it allows to access the Reactive Graph programmatically from an independent rust process by simply using the rust GraphQL client crate
* Also the rust GraphQL client is the foundation for the command line interface (see below)
* Refactored reusable parts before implementing the rest of the rust GraphQL client
* Finished the implementation of managing the type system - components, entity types and relation types can be managed now via the rust GraphQL client
* There might be some more 
* Started the implementation of the instance system (managing entity instances and relation instances)
* Decided to defer work on the flow types and flow instances till instance system has been fully implemented

## Extended the Command Line Interface

* Implemented a generic way of presenting the output in table format, as JSON and as TOML
* This allows to use the Reactive Graph CLI as tool for exporting types and instances
* Also it allows to use the CLI as stdin for other CLI programs by using shell pipes `reactive-graph client entity-type get UUID --output-format=JSON | less
* Finished the implementation of managing the type system via CLI

## Identity and Permission System

* Reactive Graph lacks an identity and permission system
* Decided to not use an existing framework because it doesn't fit well
* The type system has to be treaten a bit different from the instance system and the permission system is more complex for the instance system
* Specified how to implement the identity management and the permission system (https://github.com/reactive-graph/reactive-graph/issues/26)

## Replacing OpenSSL with rustls

* Started work on replacing OpenSSL with rustls
* Actix Web now supports rustls
* Patched the gql-client crate for rustls support
* Waiting for a PR in aws-lc-rs to be merged (https://github.com/aws/aws-lc-rs/pull/491) since aws-lc-rs requires NASM

## Continous Modernization

* Fixed a bunch of new clippy lints
* Upgraded to builds to latest nightly
* Replaced old GitHub Actions (actions-rs) with modern GitHub Actions
* We are not quite happy that windows builds needs more than an hour and mac builds more than three hours, so we added another layer of cache to speed up the CI
* Pinned the nightly version in order to make caching in the CI more effective

## Java GraphQL Client

* The goal was to show that it's possible to manage the Reactive Graph from a programming language other than Rust
* A gradle plugin generate POJOs and interfaces from the GraphQL schema (schema first approach)
* It's even possible to implement Spring Data alike repositories
* The status of this client is only POC
* In future, the Java GraphQL Client shall be on feature parity with the Rust GraphQL Client

## POC WASM / WASI

* We implemented a POC to check the current status of WASM: https://github.com/reactive-graph/poc-wasm-wasi-preview-2-plugin-system
* WASM will be an important part of the Reactive Graph,
* One use case is that the Reactive Graph could use WASM to load plugins written in "any" language that compiles to WASM
* Another use case is that the Reactive Graph could use WASM to load behaviours for reactive entities or reactive relations
* The POC showed that it now possible to interop with more complex data than primitive data types like integers

## Goals for September 2024

(highest priority on top)

* Finish work on the rust GraphQL client and the Command Line Interface
* Finish replacing OpenSSL with rustls
* Start work on the Type System Persistence
* Start work on the Identity and Permission System
