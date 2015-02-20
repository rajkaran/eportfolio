requirejs.config({
	paths: {
      app: "./app",
	  jquery: "lib/jquery-1.11.1.min",
	  bootstrap: "lib/bootstrap-3.3.1.min"
    },
    shim: {
		bootstrap: { deps: ["jquery"]}
    }
});


requirejs(["app/mainAdmin"]);