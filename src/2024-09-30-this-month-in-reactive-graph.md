---
pub_date: Mon, 30 Sep 2024 00:00:00 GMT
description: "The 'September 2024' issue of 'This Month in Reactive Graph' summarizes the progress of Reactive Graph. The topics of this issue are: Manage the type system via the command line interface, Java GraphQL Client POC and the specification of the Identity and Permission System"
---

{% import "header.tera" as header %}
{% import "footer.tera" as footer %}

{{ header::print(year="2024",month="September") }}

<hr class="surface-2">

## Table of Contents

<!-- toc -->

<hr class="surface-2">

<div class="alert alert--error">
    <h3><i class="ti ti-alert-triangle"></i> Work in progress!</h3>
    <p class="rg-alert-body">This issue of This Month in Reactive Graph is still work in progress.</p>
</div>

<hr class="surface-2">

## This Month in Reactive Graph

<span class="token rg-component">This Month in Reactive Graph</span> is a monthly summary of Reactive Graph's progress and community. We setup the
mdbook. We added multiple mdbook plugins that help to generate and maintain This Month in Reactive Graph: Templating engine, TOC, Mermaid Diagrams,
[GraphQL Playground](https://github.com/aschaeffer/mdbook-preprocessor-graphql-playground) and RSS-Feed-Generation. We setup the continuous
integration in order to generate and publish the book. Also, we styled the book using our [Design System](https;//design.reactive-graph.io/). We
hope you like it.

<hr class="celestial-blue">

## Stable Rust

The biggest news this month is that we got managed to [compile](https://github.com/reactive-graph/reactive-graph/pull/148) Reactive Graph
with [Stable Rust](https://github.com/reactive-graph/reactive-graph/issues/102).

* Implemented `DashMap` as container for subscribers of `Stream` and removed usage of the unstable feature `unsized_tuple_coercion`
* Inlined implementation of feature `path_file_prefix` which will be stabilized soon, so that this is not a blocker
* Removed usage of the unstable feature `test` and migrated to criterion (see Benchmarking with Criterion)
* Removed usage of the unstable feature `register_tool` and make tarpaulin work again without this feature
* Detect if the compiler is nightly and only if so, make use of the unstable features `unboxed_closures` and `fn_traits`

## Benchmarking with Criterion

Now the benchmark tests are run with [criterion](https://crates.io/crates/criterion) (which doesn't need Nightly Rust). Furthermore, the benchmarks has been
moved into its own `benches/` folders.

## Support for <span class="token rg-component">musl</span> builds

We [introduced](https://github.com/reactive-graph/reactive-graph/pull/155) support [MUSL](https://musl.libc.org/) builds.

> <span class="token rg-component">musl</span> is an implementation of the C standard library built on top of the Linux system call API, including interfaces
> defined in the base language standard, POSIX, and widely agreed-upon extensions. musl is lightweight, fast, simple, free, and strives to be correct in the
> sense of standards-conformance and safety.
> 
> [https://musl.libc.org/](https://musl.libc.org/)

```
$ rustup target install x
```

In order to successfully compile, you also have to install the package `musl-tools`. For example for Debian / Ubuntu, you can install it like so:

```
$ apt install musl-tools
```

## rustls

We've finished work on replacing OpenSSL with rustls. OpenSSL is no more needed to build reactive graph.

<hr class="celestial-blue">

## Continuous Integration

We upgraded the workflow actions to recent versions. Furthermore, we made some changes to <span class="token rg-component">speed up</span> the CI. We've merge
workflow files and made build jobs and test jobs dependent on the formatting check job and linting jobs. With this change, no build time is wasted if linting
and formatting doesn't meet the requirements. Furthermore, we're run linting and test suite on Linux GNU and Linux <span class="token rg-component">musl</span>
for Rust <span class="token rg-component">stable</span> and Rust <span class="token rg-component">nightly</span>. But we don't run the complete test suite on
Windows and macOS anymore. This is because running the test suite on Windows is 2x slower and on macOS is 6x slower compared to running on Linux. At a later
point we may reintroduce a smaller subset of the test suite to run on Windows and macOS.

<hr class="celestial-blue">

## Daemonize

On Linux, it's now possible to start the process and run it in the background. Because the daemon has no stdout and stderr, a file can be given as output. 
Also, the process can drop privileges to a given user+group. Optionally, a PID and name can be specified.

<details>
<summary><code>$ reactive-graph --help</code></summary>

```
  -D, --daemon
          If true, the process will run as daemon [env: REACTIVE_GRAPH_DAEMON=]
      --daemon-name <DAEMON_NAME>
          Sets the name of the daemon [env: REACTIVE_GRAPH_DAEMON_NAME=]
      --daemon-pid <DAEMON_PID>
          The location of the daemon PID file. By default, no PID file will be created [env: REACTIVE_GRAPH_DAEMON_PID=]
      --daemon-working-directory <DAEMON_WORKING_DIRECTORY>
          The working directory of the daemon [env: REACTIVE_GRAPH_DAEMON_WORKING_DIRECTORY=]
      --daemon-stdout <DAEMON_STDOUT>
          Stdout will be written into this file [env: REACTIVE_GRAPH_DAEMON_STDOUT=]
      --daemon-stderr <DAEMON_STDERR>
          Stderr will be written into this file [env: REACTIVE_GRAPH_DAEMON_STDERR=]
      --daemon-user <DAEMON_USER>
          If set will drop privileges to the specified user. Note: Both must be given: user and group [env: REACTIVE_GRAPH_DAEMON_USER=]
      --daemon-group <DAEMON_GROUP>
          If set will drop privileges to the specified group. Note: Both must be given: user and group [env: REACTIVE_GRAPH_DAEMON_GROUP=]
```


</details>

In order to start Reactive Graph as a daemon, you have to pass the parameter `-D` or set the environment variable `REACTIVE_GRAPH_DAEMON=true`:

```
$ reactive-graph --daemon
```

<hr class="celestial-blue">

## Command Line Interface

### Managing the Instance System

We finished the implementation of managing the instance system via CLI (entity instances and relation instances). Furthermore, the CLI lists the applied
components of the reactive instances.

### Documented Command Line Interface

The [book](https://docs.reactive-graph.io/book/) now contains a section about the
[Command Line Interface](https://docs.reactive-graph.io/book/CLI_Usage.html). We've added a section about the
[interactive mode](https://docs.reactive-graph.io/book/CLI_REPL.html) and a section about the
[command reference](https://docs.reactive-graph.io/book/CLI_Reference.html). For the command reference we make use of a new option to automatically generate
the help in Markdown format:

<details>
<summary><code>$ reactive-graph --markdown-help</code></summary>

TODO: Insert output here

</details>

### Output Format Count

We've added a new output format that simply prints the count instead of a table with the results. The purpose of the new feature is similar to `count(*)` in
SQL and is also useful for shell automation.

```
$ reactive-graph client components list --output-format count
$ reactive-graph client entity-types list --output-format count
$ reactive-graph client relation-types list --output-format count
$ reactive-graph client entity-instances list --output-format count
$ reactive-graph client relation-instances list --output-format count
```

#### Example: Print the count of components

<details>
<summary><code>$ reactive-graph client components list --output-format count</code></summary>

34 result(s)

</details>

#### Example: Print the count of entity-instances

<details>
<summary><code>$ reactive-graph client entity-instances list --output-format count</code></summary>

1554 result(s)

</details>

#### Example: Print the count of entity-instances that having the component `core__action`

<details>
<summary><code>$ reactive-graph client entity-instances list --components core__action --output-format count</code></summary>

2 result(s)

</details>

### Output Format HTML

We have added a new option to output the result as HTML table. This applies to all type system and instance system operations.

![Output Format HTML](images/2024-09-30/output-format-html.png "Output Format HTML")

#### List types and instances as HTML table

```
$ reactive-graph client components list --output-format html-table
$ reactive-graph client entity-types list --output-format html-table
$ reactive-graph client relation-types list --output-format html-table
$ reactive-graph client entity-instances list --output-format html-table
$ reactive-graph client relation-instances list --output-format html-table
```

#### List all components as HTML table

<details>
<summary><code>$ reactive-graph client components list --output-format html-table</code></summary>

<pre><code>
<table>
    <thead>
    <tr>
        <th>namespace</th>
        <th>name</th>
        <th>description</th>
        <th>properties</th>
        <th>extensions</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>state</td>
        <td>state_object</td>
        <td>State of type object</td>
        <td>
            <table>
                <thead>
                <tr>
                    <th>name</th>
                    <th>data_type</th>
                    <th>socket_type</th>
                    <th>mutability</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>state</td>
                    <td>Object</td>
                    <td>None</td>
                    <td>Immutable</td>
                </tr>
                <tr>
                    <td>set_state</td>
                    <td>Object</td>
                    <td>Input</td>
                    <td>Mutable</td>
                </tr>
                </tbody>
            </table>
        </td>
        <td>
        </td>
    </tr>
    <tr>
        <td>value</td>
        <td>value_debugger_trace</td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>arithmetic</td>
        <td>arithmetic_operation</td>
        <td>Arithmetic operation with one input and one result</td>
        <td>
            <table>
                <thead>
                <tr>
                    <th>name</th>
                    <th>data_type</th>
                    <th>socket_type</th>
                    <th>mutability</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>result</td>
                    <td>Number</td>
                    <td>Output</td>
                    <td>Immutable</td>
                </tr>
                <tr>
                    <td>lhs</td>
                    <td>Number</td>
                    <td>Input</td>
                    <td>Mutable</td>
                </tr>
                </tbody>
            </table>
        </td>
        <td>
            <table>
                <thead>
                <tr>
                    <th>Namespace</th>
                    <th>TypeName</th>
                    <th>Description</th>
                    <th>Extension</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>core</td>
                    <td>component_category</td>
                    <td></td>
                    <td>"math"</td>
                </tr>
                </tbody>
            </table>
        </td>
    </tr>
    <tr>
        <td>base</td>
        <td>named</td>
        <td>The entity or relation has a name.</td>
        <td>
            <table>
                <thead>
                <tr>
                    <th>name</th>
                    <th>data_type</th>
                    <th>socket_type</th>
                    <th>mutability</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>name</td>
                    <td>String</td>
                    <td>None</td>
                    <td>Mutable</td>
                </tr>
                </tbody>
            </table>
        </td>
        <td>
            <table>
                <thead>
                <tr>
                    <th>Namespace</th>
                    <th>TypeName</th>
                    <th>Description</th>
                    <th>Extension</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>core</td>
                    <td>component_category</td>
                    <td></td>
                    <td>"base"</td>
                </tr>
                </tbody>
            </table>
        </td>
    </tr>
    <tr>
        <td>value</td>
        <td>value_object</td>
        <td>Value of type object</td>
        <td>
            <table>
                <thead>
                <tr>
                    <th>name</th>
                    <th>data_type</th>
                    <th>socket_type</th>
                    <th>mutability</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>value</td>
                    <td>Object</td>
                    <td>Output</td>
                    <td>Mutable</td>
                </tr>
                </tbody>
            </table>
        </td>
        <td>
        </td>
    </tr>
    <tr>
        <td>result</td>
        <td>result_boolean</td>
        <td>The entity returns a boolean</td>
        <td>
            <table>
                <thead>
                <tr>
                    <th>name</th>
                    <th>data_type</th>
                    <th>socket_type</th>
                    <th>mutability</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>result</td>
                    <td>Bool</td>
                    <td>Output</td>
                    <td>Immutable</td>
                </tr>
                </tbody>
            </table>
        </td>
        <td>
            <table>
                <thead>
                <tr>
                    <th>Namespace</th>
                    <th>TypeName</th>
                    <th>Description</th>
                    <th>Extension</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>core</td>
                    <td>component_category</td>
                    <td></td>
                    <td>"result"</td>
                </tr>
                </tbody>
            </table>
        </td>
    </tr>
    </tbody>
</table>
</code></pre>

</details>

#### Output a single type or a single instance as HTML table

```
$ reactive-graph client components get <namespace> <type_name> --output-format html-table
$ reactive-graph client entity-types get <namespace> <type_name> --output-format html-table
$ reactive-graph client relation-types get <namespace> <type_name> --output-format html-table
$ reactive-graph client entity-instances get <namespace> <type_name> --output-format html-table
$ reactive-graph client relation-instances get <namespace> <type_name> --output-format html-table
```

#### Output a single component as HTML table

<details>
<summary><code>$ reactive-graph client components get value value_number --output-format html-table</code></summary>

<table>
    <thead>
        <tr>
            <th>namespace</th>
            <th>name</th>
            <th>description</th>
            <th>properties</th>
            <th>extensions</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>value</td>
            <td>value_number</td>
            <td>Value of type number</td>
            <td>
                <table><thead><tr><th>name</th><th>data_type</th><th>socket_type</th><th>mutability</th></tr></thead><tbody><tr><td>value</td><td>Number</td><td>Output</td><td>Mutable</td></tr></tbody></table>
            </td>
            <td>
            </td>
        </tr>
    </tbody>
</table>

</details>

### Output Format Markdown

Similar to the Output Format HTML, the Output Format Markdown prints the result as Markdown Table.

![Output Format Markdown](images/2024-09-30/output-format-markdown.png "Output Format Markdown")

#### List types and instances as Markdown table

```
$ reactive-graph client components list --output-format markdown-table
$ reactive-graph client entity-types list --output-format markdown-table
$ reactive-graph client relation-types list --output-format markdown-table
$ reactive-graph client entity-instances list --output-format markdown-table
$ reactive-graph client relation-instances list --output-format markdown-table
```

#### List all components as Markdown table

<details>
<summary><code>$ reactive-graph client components list --output-format markdown-table</code></summary>

| namespace  | name                 | description                                                                                             | properties                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | extensions                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
|------------|----------------------|---------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| state      | state_object         | State of type object                                                                                    | <table><thead><tr><th><div><p>name</p></div></th><th><div><p>data_type</p></div></th><th><div><p>socket_type</p></div></th><th><div><p>mutability</p></div></th></tr></thead><tbody><tr><td><div><p>set_state</p></div></td><td><div><p>Object</p></div></td><td><div><p>Input</p></div></td><td><div><p>Mutable</p></div></td></tr><tr><td><div><p>state</p></div></td><td><div><p>Object</p></div></td><td><div><p>None</p></div></td><td><div><p>Immutable</p></div></td></tr></tbody></table>                                                                                                                                                                                                                                                                                                                                                                                                                                            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| value      | value_debugger_trace |                                                                                                         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| arithmetic | arithmetic_operation | Arithmetic operation with one input and one result                                                      | <table><thead><tr><th><div><p>name</p></div></th><th><div><p>data_type</p></div></th><th><div><p>socket_type</p></div></th><th><div><p>mutability</p></div></th></tr></thead><tbody><tr><td><div><p>result</p></div></td><td><div><p>Number</p></div></td><td><div><p>Output</p></div></td><td><div><p>Immutable</p></div></td></tr><tr><td><div><p>lhs</p></div></td><td><div><p>Number</p></div></td><td><div><p>Input</p></div></td><td><div><p>Mutable</p></div></td></tr></tbody></table>                                                                                                                                                                                                                                                                                                                                                                                                                                               | <table><thead><tr><th><div><p>Namespace</p></div></th><th><div><p>TypeName</p></div></th><th><div><p>Description</p></div></th><th><div><p>Extension</p></div></th></tr></thead><tbody><tr><td><div><p>core</p></div></td><td><div><p>component_category</p></div></td><td><div><p></p></div></td><td><div><p>"math"</p></div></td></tr></tbody></table>                                                                                                                     |
| base       | named                | The entity or relation has a name.                                                                      | <table><thead><tr><th><div><p>name</p></div></th><th><div><p>data_type</p></div></th><th><div><p>socket_type</p></div></th><th><div><p>mutability</p></div></th></tr></thead><tbody><tr><td><div><p>name</p></div></td><td><div><p>String</p></div></td><td><div><p>None</p></div></td><td><div><p>Mutable</p></div></td></tr></tbody></table>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | <table><thead><tr><th><div><p>Namespace</p></div></th><th><div><p>TypeName</p></div></th><th><div><p>Description</p></div></th><th><div><p>Extension</p></div></th></tr></thead><tbody><tr><td><div><p>core</p></div></td><td><div><p>component_category</p></div></td><td><div><p></p></div></td><td><div><p>"base"</p></div></td></tr></tbody></table>                                                                                                                     |
| value      | value_object         | Value of type object                                                                                    | <table><thead><tr><th><div><p>name</p></div></th><th><div><p>data_type</p></div></th><th><div><p>socket_type</p></div></th><th><div><p>mutability</p></div></th></tr></thead><tbody><tr><td><div><p>value</p></div></td><td><div><p>Object</p></div></td><td><div><p>Output</p></div></td><td><div><p>Mutable</p></div></td></tr></tbody></table>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| result     | result_boolean       | The entity returns a boolean                                                                            | <table><thead><tr><th><div><p>name</p></div></th><th><div><p>data_type</p></div></th><th><div><p>socket_type</p></div></th><th><div><p>mutability</p></div></th></tr></thead><tbody><tr><td><div><p>result</p></div></td><td><div><p>Bool</p></div></td><td><div><p>Output</p></div></td><td><div><p>Immutable</p></div></td></tr></tbody></table>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | <table><thead><tr><th><div><p>Namespace</p></div></th><th><div><p>TypeName</p></div></th><th><div><p>Description</p></div></th><th><div><p>Extension</p></div></th></tr></thead><tbody><tr><td><div><p>core</p></div></td><td><div><p>component_category</p></div></td><td><div><p></p></div></td><td><div><p>"result"</p></div></td></tr></tbody></table>                                                                                                                   |

</details>

#### Output a single type or a single instance as Markdown table

```
$ reactive-graph client components get <namespace> <type_name> --output-format markdown-table
$ reactive-graph client entity-types get <namespace> <type_name> --output-format markdown-table
$ reactive-graph client relation-types get <namespace> <type_name> --output-format markdown-table
$ reactive-graph client entity-instances get <namespace> <type_name> --output-format markdown-table
$ reactive-graph client relation-instances get <namespace> <type_name> --output-format markdown-table
```

#### Output a single component as Markdown table

<details>
<summary><code>$ reactive-graph client components get value value_number --output-format markdown-table</code></summary>

| namespace | name         | description          | properties                                                                                                                                                                                                                                                                                                                                        | extensions |
|-----------|--------------|----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------|
| value     | value_number | Value of type number | <table><thead><tr><th><div><p>name</p></div></th><th><div><p>data_type</p></div></th><th><div><p>socket_type</p></div></th><th><div><p>mutability</p></div></th></tr></thead><tbody><tr><td><div><p>value</p></div></td><td><div><p>Number</p></div></td><td><div><p>Output</p></div></td><td><div><p>Mutable</p></div></td></tr></tbody></table> |            |

</details>


<hr class="celestial-blue">

## Design System Enhancements

### Circle Logos

We added a [new set of logos](https://design.reactive-graph.io/docs/fundamentals/logo.html) with a circle around the inner graph symbol:

<table>
    <tr>
        <td>Black/White</td>
        <td>Malachite</td>
        <td>Selective Yellow</td>
        <td>Celestial Blue</td>
        <td>Mexican Pink</td>
        <td>Chartreuse</td>
    </tr>
    <tr>
        <td></td>
        <td><img src="design/public/logo/circle/reactive-graph-circle-malachite.svg" style="width:64px;height:64px;"></td>
        <td><img src="design/public/logo/circle/reactive-graph-circle-selective-yellow.svg" style="width:64px;height:64px;"></td>
        <td><img src="design/public/logo/circle/reactive-graph-circle-celestial-blue.svg" style="width:64px;height:64px;"></td>
        <td><img src="design/public/logo/circle/reactive-graph-circle-mexican-pink.svg" style="width:64px;height:64px;"></td>
        <td><img src="design/public/logo/circle/reactive-graph-circle-chartreuse.svg" style="width:64px;height:64px;"></td>
    </tr>
    <tr>
        <td><img src="design/public/logo/circle/reactive-graph-circle-black.svg" style="width:64px;height:64px;text-align:center;"></td>
        <td><img src="design/public/logo/circle/reactive-graph-circle-black-malachite.svg" style="width:64px;height:64px;"></td>
        <td><img src="design/public/logo/circle/reactive-graph-circle-black-selective-yellow.svg" style="width:64px;height:64px;"></td>
        <td><img src="design/public/logo/circle/reactive-graph-circle-black-celestial-blue.svg" style="width:64px;height:64px;"></td>
        <td><img src="design/public/logo/circle/reactive-graph-circle-black-mexican-pink.svg" style="width:64px;height:64px;"></td>
        <td><img src="design/public/logo/circle/reactive-graph-circle-black-chartreuse.svg" style="width:64px;height:64px;"></td>
    </tr>
    <tr>
        <td><img src="design/public/logo/circle/reactive-graph-circle-white.svg" style="width:64px;height:64px;text-align:center;"></td>
        <td><img src="design/public/logo/circle/reactive-graph-circle-white-malachite.svg" style="width:64px;height:64px;"></td>
        <td><img src="design/public/logo/circle/reactive-graph-circle-white-selective-yellow.svg" style="width:64px;height:64px;"></td>
        <td><img src="design/public/logo/circle/reactive-graph-circle-white-celestial-blue.svg" style="width:64px;height:64px;"></td>
        <td><img src="design/public/logo/circle/reactive-graph-circle-white-mexican-pink.svg" style="width:64px;height:64px;"></td>
        <td><img src="design/public/logo/circle/reactive-graph-circle-white-chartreuse.svg" style="width:64px;height:64px;"></td>
    </tr>
</table>

### Horizontal Rules

Nothing special, but useful: [horizontal rules](https://design.reactive-graph.io/components/detail/hr--default.html)

<hr class="celestial-blue">

## Social Media

We created a [YouTube channel](https://www.youtube.com/@reactive-graph), a [facebook profile](https://www.facebook.com/reactive.graph) and a
[mastodon account](https://floss.social/@reactive_graph). We will start social media activities in near future.

<hr class="celestial-blue">

## Sponsoring

We created an account on [Open Collective](https://opencollective.com/reactive-graph). Your support will help us to pay for our infrastructural costs.

<hr class="celestial-blue">

## Goals for October 2024

(highest priority on top)

* Work on the Type System Persistence

{{ footer::print(issue_date_previous="2024-08-31", issue_date_next="") }}
