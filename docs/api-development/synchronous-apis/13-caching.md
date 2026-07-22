---
title: "Caching"
---

Caching enables faster API responses and reduces backend load. It's well suited to information that's frequently requested but doesn't change often — for example, a list of MSD service centre locations or reference/lookup codes.

## **Response cache**

A response cache stores the response to a GET request on a unique resource, held as close to the consumer as possible while remaining inside the agency's security boundary. Many API gateway products provide a built-in response cache.

<Standard id="MSDAS_SHOULD_API_PROVIDERS_MONITOR_RESPONSE_CACHE" type="SHOULD">
API Providers SHOULD monitor their response cache to keep stale objects to a minimum, ensuring the cache is refreshed once information is updated or a timeout occurs.
</Standard>

For example: a client requests service centre opening hours; the gateway checks its cache, and on a miss retrieves the data from the provider and caches it for subsequent requests. If the opening hours are later updated via a PUT request, the gateway invalidates the corresponding cache entry so the next GET returns current information.

## **Object cache**

An object cache holds objects fundamental to an API's function that don't change often — for example, a reference table of benefit or entitlement codes used to validate incoming requests. Rather than querying the reference database on every request, the API layer caches these codes with a time-to-live (TTL) and refers to the cache until it expires or is explicitly invalidated (for example, when an administrator updates the reference data).
