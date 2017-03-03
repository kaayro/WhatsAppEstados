var app = {
	init: function(){
		//window.localStorage.clear();
		//inicializar valores
		app.initdatabase();
		app.updateRequest();
		$('#category').val(window.localStorage.getItem('categorySelected'));
		
		//acciones
		$('#category').change(app.changeCategory);
		$('#btn-next').click(app.nextImage);
		$('#btn-back').click(app.backImage);
		app.connection(window.localStorage.getItem('categorySelected'), window.localStorage.getItem(window.localStorage.getItem('categorySelected')), 0);
		
	},
	connection: function(cat,id,act){
		$.post('../web/list.php', { action: 'showList', category: cat, id: id }, function(data){
			var aux = data.split('>');
			if(aux.length == 1){
				data = JSON.parse(data);
				$('#home section img').attr('src',data.url);
			}else{
				var id = parseInt(window.localStorage.getItem(window.localStorage.getItem('categorySelected')));
				if(act == 1)
					window.localStorage.setItem(window.localStorage.getItem('categorySelected'), id-1);
				else if(act == 2)
					window.localStorage.setItem(window.localStorage.getItem('categorySelected'), id+1);				
			}
		});
	},
	updateRequest: function(){
		$.post('../web/list.php', { action: 'isThereUpdate' }, function(data){
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
		window.localStorage.setItem(window.localStorage.getItem('categorySelected'), id+1);
	},
	backImage: function(){
		var id = parseInt(window.localStorage.getItem(window.localStorage.getItem('categorySelected')));
		app.connection(window.localStorage.getItem('categorySelected'),id-1, 2);
		window.localStorage.setItem(window.localStorage.getItem('categorySelected'), id-1);
	}
};
$(app.init);