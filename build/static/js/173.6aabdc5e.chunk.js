(this["webpackJsonp@jscodepad/local-client"]=this["webpackJsonp@jscodepad/local-client"]||[]).push([[173],{383:function(t,a){!function(t){t.languages.http={"request-line":{pattern:/^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\s(?:https?:\/\/|\/)\S+\sHTTP\/[0-9.]+/m,inside:{property:/^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b/,"attr-name":/:\w+/}},"response-status":{pattern:/^HTTP\/1.[01] \d+.*/m,inside:{property:{pattern:/(^HTTP\/1.[01] )\d+.*/i,lookbehind:!0}}},"header-name":{pattern:/^[\w-]+:(?=.)/m,alias:"keyword"}};var a,e,n,p=t.languages,s={"application/javascript":p.javascript,"application/json":p.json||p.javascript,"application/xml":p.xml,"text/xml":p.xml,"text/html":p.html,"text/css":p.css},i={"application/json":!0,"application/xml":!0};for(var r in s)if(s[r]){a=a||{};var l=i[r]?(n=(e=r).replace(/^[a-z]+\//,""),"(?:"+e+"|\\w+/(?:[\\w.-]+\\+)+"+n+"(?![+\\w.-]))"):r;a[r.replace(/\//g,"-")]={pattern:RegExp("(content-type:\\s*"+l+"[\\s\\S]*?)(?:\\r?\\n|\\r){2}[\\s\\S]*","i"),lookbehind:!0,inside:s[r]}}a&&t.languages.insertBefore("http","header-name",a)}(Prism)}}]);
//# sourceMappingURL=173.6aabdc5e.chunk.js.map