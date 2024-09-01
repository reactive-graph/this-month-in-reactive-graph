# This Month in Reactive Graph (2024-09-30)

```admonish warn "Work in Progress"
This is not the final version of This Month in Reactive Graph
```

## Reactive Graph - Graph Model

* Non-Reactive EntityInstance and RelationInstance now contains the applied components
* This is useful for exporting and importing reactive instances as they may have got additional components
* Additionally, the GraphQL Client and the CLI can query and list the applied components of reactive instances

## Extended the Rust GraphQL Client

* Finished the implementation of managing the instance system (entity instances and relation instances)
* Extended the type system search functionality

## Extended the Command Line Interface

* Finished the implementation of managing the instance system via CLI (entity instances and relation instances)
* With the new --output-format=count you can return the number of results instead of the actual data
* Book: Documented the command line interface using auto-generated markdown that uses the help system of the CLI

## rustls replaces OpenSSL

* Finished work on replacing OpenSSL with rustls. OpenSSL is no more needed to build reactive graph.

## Continuous Modernization

* Upgraded to nightly-YYYY-MM-DD
* We plan to pin the nightly version every six weeks (in sync with stable rust)

## Documentation

* Added 

## Goals for October 2024

(highest priority on top)

* Start work on the Type System Persistence
* Start work on the Identity and Permission System

```admonish tip "Homepage"
https://this-month-in.reactive-graph.io/
```
