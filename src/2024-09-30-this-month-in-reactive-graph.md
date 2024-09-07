---
pub_date: Mon, 30 Sep 2024 00:00:00 GMT
description: "The 'September 2024' issue of 'This Month in Reactive Graph' summarizes the progress of Reactive Graph. The topics of this issue are: Manage the type system via the command line interface, Java GraphQL Client POC and the specification of the Identity and Permission System"
---

{% import "header.tera" as header %}
{% import "footer.tera" as footer %}

{{ header::print(year="2024",month="September") }}

<div class="alert alert--error">
    <h3><i class="ti ti-alert-triangle"></i> Work in progress!</h3>
    <p class="rg-alert-body">This issue of This Month in Reactive Graph is still work in progress.</p>
</div>

<section class="rg-emphasis-box">
    <h3 class="">This Month in Reactive Graph! <span class="tag rg-component">September 2024</span></h3>
    <p class="intro">Hello and welcome to another issue of This Month in Reactive Graph! Reactive Graph is a runtime empowering everyone to build reliable and efficient software. This is a monthly summary of its progress and community. Want something mentioned? Send us a pull request. Want to get involved? We love contributions.</p>
    <p>This Month in Reactive Graph is openly developed on GitHub and archives can be viewed at <a href="https://this-month-in.reactive-graph.io/">this-month-in.reactive-graph.io</a>. If you find any errors in this month's issue, please submit a PR.</p>
</section>

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

{{ footer::print(issue_date_previous="2024-08-31", issue_date_next="") }}
