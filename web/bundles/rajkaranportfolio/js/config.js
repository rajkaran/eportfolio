requirejs.config({
	paths: {
      app: "./app",
	  jquery: "lib/jquery-1.11.1.min",
	  bootstrap: "lib/bootstrap-3.3.1.min",
	  draggable: "lib/svg.draggable",
	  svg: "lib/svg"
    },
    shim: {
		bootstrap: { deps: ["jquery"]},
		draggable: { deps: ["svg"]},
		svg: { deps: ["jquery"]}
    }
});


requirejs(["app/main"]);