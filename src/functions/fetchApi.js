const fetchApi = async (url, myHeaders, method, body , alertBox) => {

    if (!method) {
        method='GET'
    }
    if (!myHeaders) {
        myHeaders = new Headers();
        myHeaders.append("Content-type", "application/json; charset=UTF-8");
    }

    return fetch(url ,
            {   method: method,
                    headers: myHeaders
                })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        })
        .then((result) => {
            return {success: true, results: result }
        })
        .catch((err) => {
            const errorsApiRest = [
                {
                    status: 302,
                    Reason: "Found",
                    description:
                        "Resource temporarily located elsewhere according to the Location header."
                },
                {
                    status: 303,
                    Reason: "mediaDownloadRedirect",
                    description:
                        "When requesting a download using alt=media URL parameter, the direct URL path to use is prefixed by /download. If this is omitted, the service will issue this redirect with the appropriate media download path in the Location header."
                },
                {
                    status: 304,
                    Reason: "notModified",
                    description:
                        "The conditional request would have been successful, but the condition was false, so no body was sent."
                },
                {
                    status: 307,
                    Reason: "temporaryRedirect",
                    description:
                        "Resource temporarily located elsewhere according to the Location header. Among other reasons, this can occur when cookie-based authentication is being used, e.g., when using the Storage Browser, and it receives a request to download content."
                },
                {
                    status: 308,
                    Reason: "Description",
                    description:
                        "Indicates an incomplete resumable upload and provides the range of bytes already received by Cloud Storage. Responses with this status do not contain a body."
                },
                {
                    status: 400,
                    Reason: "badRequest",
                    description:
                        "The request cannot be completed based on your current Cloud Storage settings. For example, you cannot lock a retention policy if the requested bucket doesn't have a retention policy, and you cannot set ACLs if the requested bucket has Bucket Policy Only enabled."
                },
                {
                    status: 401,
                    Reason: "Unauthorized",
                    description: "Access to a Requester requires authentication."
                },
                {
                    status: 403,
                    Reason: "Unauthorized",
                    description:
                        "According to access control policy, the current user does not have access to perform the requested action. This code applies even if the resource being acted on doesn't exist.."
                },
                {
                    status: 404,
                    Reason: "Not Found",
                    description:
                        "Either there is no API method associated with the URL path of the request, or the request refers to one or more resources that were not found.."
                },
                {
                    status: 405,
                    Reason: "Method Not Allowed",
                    description:
                        "The HTTP verb is not supported by the URL endpoint used in the request."
                },
                {
                    status: 408,
                    Reason: "Request Timeout",
                    description: "The request timed out. "
                },
                {
                    status: 409,
                    Reason: "conflict",
                    description:
                        "A request to change a resource, usually a storage.*.update or storage.*.patch method, failed to commit the change due to a conflicting concurrent change to the same resource. The request can be retried, though care should be taken to consider the new state of the resource to avoid blind replacement of another agent's changes."
                },
                {
                    status: 410,
                    Reason: "Gone",
                    description:
                        "You have attempted to use a resumable upload session or rewrite token that is no longer available. If the reported status code was not successful and you still wish to complete the upload or rewrite, you must start a new session."
                },
                {
                    status: 412,
                    Reason: "Precondition Failed",
                    description:
                        "At least one of the pre-conditions you specified did not hold."
                },
                {
                    status: 413,
                    Reason: "uploadTooLarge",
                    description: "Attempt to upload an object to large"
                },
                {
                    status: 416,
                    Reason: "Requested Range Not Satisfiable",
                    description: "The requested Range cannot be satisfied."
                },
                {
                    status: 429,
                    Reason: "Too Many Requests",
                    description:
                        "A Cloud Storage JSON API usage limit was exceeded. If your application tries to use more than its limit, additional requests will fail."
                },
                {
                    status: 499,
                    Reason: "Client Closed Request",
                    description:
                        "The resumable upload was cancelled at the client's request prior to completion. This error has no response body."
                },
                {
                    status: 500,
                    Reason: "backendError",
                    description: "We encountered an internal error."
                },
                {
                    status: 502,
                    Reason: "Bad Gateway",
                    description:
                        "This error is generated when there was difficulty reaching an internal service."
                },
                {
                    status: 503,
                    Reason: "Service Unavailable",
                    description: "We encountered an internal error."
                },
                {
                    status: 504,
                    Reason: "Gateway Timeout",
                    description:
                        "This error is generated when there was difficulty reaching an internal service."
                }
            ];
            const foundError = errorsApiRest.find((e) => e.status === err.status);
            if (alertBox){
                const info = `Erro ${foundError.status} - Algo correu mal, é recomendado atualizar a pagina`
                console.error(info);
                alert(info)
            }

            /*const errorMessageReact = () => {
                return (
                    <>
                        <p>
                            Oops, something went wrong... error <b>{foundError.status}</b>{" "}
                            detected!
                        </p>
                        <p>
                            <b>Reason :</b> {foundError.Reason}
                        </p>
                        <p>
                            <b>Possible cause :</b> {foundError.description}
                        </p>
                    </>
                );
            }*/
            return {success: false, results: [] }
        }
    )

};

export default fetchApi;
