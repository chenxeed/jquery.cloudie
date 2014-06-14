// jquery.cloudie.v1
// Copyright by ChenX @ 2014
// Contact me for support at
// email : chenxeed@gmail.com
// github : chenxeed

(function ( $ ) {
	$.fn.cloudie = function(options){

		// Set variable option
		var settings = $.extend({
			container_class : 'cloudie',
			load_count : 2,
			load_interval : 2000,
			duration : 10000,
			images : ["img/cloud-1.png","img/cloud-2.png"],
			top_range : 200,
			direction : 'random'
		}, options);
		
		// If first load count not set, use load count
		if(!settings.first_load_count){
			settings.first_load_count = settings.load_count;
		}

		return this.each(function(){

			// Set variable needed
			var $container = $(this);
			$container.addClass(settings.container_class);
			
			// Function to create cloud
			var createCloud = function(count){
				if(count===undefined) count=1;
				for(var i=0; i<count;i++){
					var $cloud = $("<div>",{class:"cloud", style:"opacity:0;"});
					var cloud_num = Math.ceil(Math.random()*settings.images.length);
					var cloud_top = Math.ceil(Math.random()*200);
					var cloud_left = Math.ceil(Math.random()*$container.width()-($container.width()/2) );
					var cloud_right = Math.ceil(cloud_left + Math.random()*$container.width());
					var start=0, end=0;
					var direction = settings.direction;
					if(direction==='random'){
						var guess = Math.ceil(Math.random()*2);
						if(guess===1){
							direction = 'left';
						}else{
							direction = 'right';
						}
					}
					switch(direction){
						default:
						case 'left':
							start = cloud_left;
							end = cloud_right;
							break;
						case 'right' :
							start = cloud_right;
							end = cloud_left;
							break;
					}
					//NEXT TO DO ADD MATH RANDOM FOR TOP AND LEFT
					//cloud.css("top",Math.ceil(Math.random());
					var $cloud_img = $("<img>",{src:settings.images[cloud_num-1]});
					$cloud.append($cloud_img);
					$cloud.css('top',cloud_top);
					$cloud.css('left',start);
					$container.append($cloud);
					$cloud.animate({left:end, opacity: 1}, settings.duration, function(){
						$(this).fadeOut(1000, function(){
							$(this).remove();
						})
					});
				}
			};
			//At first,create some clouds
			createCloud(settings.first_load_count);	
			//Periodically create another clouds
			setInterval(function(){
				createCloud(settings.load_count);
			}, settings.load_interval);
		});
	};
}( jQuery ));