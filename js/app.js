var app = {
	server: 'http://igitweb.com/whatsappestados/list.php',
	//server: 'http://localhost/iGitweb/EstadosWhats/web/list.php',
	ready: function(){
		document.addEventListener('deviceready',app.init,false);
	},
	init: function(){
		//inicializar valores
		app.initdatabase();
		app.updateRequest();
		$('#category').val(window.localStorage.getItem('categorySelected'));
		
		//acciones
		$('#category').change(app.changeCategory);
		$(document).on('click','#btn-next',app.nextImage);
		$('#btn-back').click(app.backImage);
		app.connection(window.localStorage.getItem('categorySelected'), window.localStorage.getItem(window.localStorage.getItem('categorySelected')), 0);
		$('#btn-down').click(app.share);
		
		//anuncios
		ads.init();
		
	},
	connection: function(cat,id,act){
		$('#loading').show();
		$.post(app.server, { action: 'showList', category: cat, id: id }, function(data){
			data = JSON.parse(data);
			if(data.last == 0 && id >= 0){
				$('#home section img').attr('src',data.url);
				$('#home section img')[0].addEventListener('load',function(){$('#loading').hide();},false);
				window.localStorage.setItem(window.localStorage.getItem('categorySelected'), id);			
			}else
				$('#loading').hide();
		}).fail(function(e){
			alert(e);
		});
	},
	updateRequest: function(){
		$.post(app.server, { action: 'isThereUpdate' }, function(data){
			if(data == '1'){
				window.localStorage.clear();
				app.initdatabase();
			}
		});
	},
	initdatabase: function(){
		if(window.localStorage.getItem('categorySelected') == undefined){
			window.localStorage.setItem('categorySelected',0);
			window.localStorage.setItem(0,0);//romance
			window.localStorage.setItem(1,0);//buena vibra
			window.localStorage.setItem(2,0);//humor
		}
	},
	changeCategory: function(){
		var cat = $(this).val();
		window.localStorage.setItem('categorySelected',cat);
		app.connection(window.localStorage.getItem('categorySelected'),window.localStorage.getItem(window.localStorage.getItem('categorySelected')));
	},
	nextImage: function(){
		var id = parseInt(window.localStorage.getItem(window.localStorage.getItem('categorySelected')));
		app.connection(window.localStorage.getItem('categorySelected'),id+1, 1);
		//window.localStorage.setItem(window.localStorage.getItem('categorySelected'), id+1);
	},
	backImage: function(){
		var id = parseInt(window.localStorage.getItem(window.localStorage.getItem('categorySelected')));
		app.connection(window.localStorage.getItem('categorySelected'),id-1, 2);
		if(id > 0)
			window.localStorage.setItem(window.localStorage.getItem('categorySelected'), id-1);
	},
	share: function(){
		var url = $('#home section img').attr('src');
		download.image(url);
	}
};
$(app.ready);

var ads = {
	init: function(){
		admob.initAdmob("ca-app-pub-3644885202752337/8471325200","ca-app-pub-3644885202752337/9250054400");
		admob.showBanner(admob.BannerSize.BANNER,admob.Position.BOTTOM_APP);
	}
};

/*var share = {
	image: function(url){
		window.plugins.socialsharing.share(null, null, url, null);
	}
};*/
/*var download = {
	transfer: new FileTransfer(),
	image: function(url){
		download.getFolder(url);
	},
	getFolder: function(url){
		window.requestFileSystem(window.PERSISTENT, 5 * 1024 * 1024, function(fs){

			console.log('file system open: ' + fs.name);

			// Parameters passed to getFile create a new file or return the file if it already exists. 
			fs.root.getFile('downloaded-image.png', { create: true, exclusive: false }, function (fileEntry) {
				download.download(fileEntry, url, true);

			}, download.error);

		}, download.error);
	},
	download: function(fileEntry, uri, readBinaryData) {
 
		var fileTransfer = new FileTransfer();
		var fileURL = fileEntry.toURL();

		fileTransfer.download(uri, fileURL, function (entry) {
				console.log("Successful download...");
				console.log("download complete: " + entry.toURL());
				alert('Descargado');
			}, function (error) {
				console.log("download error source " + error.source);
				console.log("download error target " + error.target);
				console.log("upload error code" + error.code);
			}, null, false);
	},
	error: function(err){
		alert("Error");
	}
};*/