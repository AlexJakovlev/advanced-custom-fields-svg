(function ($, undefined) {

	var Field = acf.Field.extend({

		type: 'svg',

		$control: function () {
			return this.$('.acf-image-uploader');
		},

		$input: function () {
			return this.$('input[type="hidden"]');
		},

		events: {
			'click a[data-name="add"]': 'onClickAdd',
			'click a[data-name="edit"]': 'onClickEdit',
			'click a[data-name="remove"]': 'onClickRemove',
			'change input[type="file"]': 'onChange'
		},

		initialize: function () {

			// add attribute to form
			if (this.get('uploader') === 'basic') {
				this.$el.closest('form').attr('enctype', 'multipart/form-data');
			}
		},

		validateAttachment: function (attachment) {

			// defaults
			attachment = attachment || {};

			// WP attachment
			if (attachment.id !== undefined) {
				attachment = attachment.attributes;
			}

			// args
			attachment = acf.parseArgs(attachment, {
				url: '',
				alt: '',
				title: '',
				caption: '',
				description: '',
				width: 0,
				height: 0
			});

			// preview size
			var url = acf.isget(attachment, 'sizes', this.get('preview_size'), 'url');
			if (url !== null) {
				attachment.url = url;
			}

			// return
			return attachment;
		},

		render: function (attachment) {

			// vars
			attachment = this.validateAttachment(attachment);

			// update image
			this.$('img').attr({
				src: attachment.url,
				alt: attachment.alt,
				title: attachment.title
			});

			// vars
			var val = attachment.id || '';

			// update val
			this.val(val);

			// update class
			if (val) {
				this.$control().addClass('has-value');
			} else {
				this.$control().removeClass('has-value');
			}
		},

		// create a new repeater row and render value
		append: function (attachment, parent) {

			// create function to find next available field within parent
			var getNext = function (field, parent) {

				// find existing file fields within parent
				var fields = acf.getFields({
					key: field.get('key'),
					parent: parent.$el
				});

				// find the first field with no value
				for (var i = 0; i < fields.length; i++) {
					if (!fields[i].val()) {
						return fields[i];
					}
				}

				// return
				return false;
			}

			// find existing file fields within parent
			var field = getNext(this, parent);

			// add new row if no available field
			if (!field) {
				parent.$('.acf-button:last').trigger('click');
				field = getNext(this, parent);
			}

			// render
			if (field) {
				field.render(attachment);
			}
		},

		selectAttachment: function () {

			// vars
			var parent = this.parent();
			var multiple = (parent && parent.get('type') === 'repeater');

			// new frame
			var frame = acf.newMediaPopup({
				mode: 'select',
				type: 'image',
				title: acf.__('Select Image'),
				field: this.get('key'),
				multiple: multiple,
				library: this.get('library'),
				allowedTypes: this.get('mime_types'),
				select: $.proxy(function (attachment, i) {
					if (i > 0) {
						this.append(attachment, parent);
					} else {
						this.render(attachment);
					}
				}, this)
			});
		},

		editAttachment: function () {

			// vars
			var val = this.val();

			// bail early if no val
			if (!val) return;

			// popup
			var frame = acf.newMediaPopup({
				mode: 'edit',
				title: acf.__('Edit Image'),
				button: acf.__('Update Image'),
				attachment: val,
				field: this.get('key'),
				select: $.proxy(function (attachment, i) {
					this.render(attachment);
				}, this)
			});
		},

		removeAttachment: function () {
			this.render(false);
		},

		onClickAdd: function (e, $el) {
			this.selectAttachment();
		},

		onClickEdit: function (e, $el) {
			this.editAttachment();
		},

		onClickRemove: function (e, $el) {
			this.removeAttachment();
		},

		onChange: function (e, $el) {
			var $hiddenInput = this.$input();

			acf.getFileInputData($el, function (data) {
				$hiddenInput.val($.param(data));
			});
		}
	});
	acf.registerFieldType(Field);
	// acf.newCompatibility(acf.screen, {
	// 	fetch: acf.screen.check
	// });
})(jQuery);
/*****  end SVG ***/



(window.document.onload = function () {
	function get_ext(url){
	// return url.substr(url.lastIndexOf(".") + 1);
	return url.substr((~-url.lastIndexOf(".") >>> 0) + 2); // get extension from url
}

function create_html(tags,obj){
	var elementHTML = '' ;
	if ('media_loader' === obj.action)  { 
		console.log(obj.action);

		elementHTML = obj.img.parentNode;
		elementHTML.setAttribute('style','transform: translate(0%,0%)')
		console.log(obj);
	}
	var innerHTML = '<div style="height:100%; width:100%;">';
	for (var tag of tags){
		innerHTML +='<div style="height:20%; width:20%; display: block; float: left;"><svg src="'+obj.url+'" style=" height:100%; width:100%;"><use xlink:href="'+obj.url+'#'+tag.getAttribute('id')+'"  ></use></svg></div>';
	}
	innerHTML +='</div>'
	// console.log(outerHTML);
	elementHTML.innerHTML = innerHTML;
}

function handler_child(obj) {
	console.log('+++');
	$.ajax({
		type: 'GET',
		url: obj.url,
		success: function (data){
			var tags = data.getElementsByTagName("symbol");
			if (0 < tags.length) {
				create_html(tags,obj)
			}
		}
	});
}

function clearsiblings(element){
	console.log(element);
	$(element).attr('style','display:block;');
	element =  element.nextSibling;
	console.log(element);
	// var sibl = $(element).childrens(".buttons_svg");
// console.log(sibl);
element.remove();
}
function create_innerHTML(inners, element,url){
	var element_id = $(element).parent().siblings('input').attr('name');
	var svg_select = $(element).attr('data-svg');
	var acf_field_value = document.getElementsByName(element_id)[0].getAttribute('value');
	var str_index=acf_field_value.indexOf(':');
	if ( -1 === str_index) {
		acf_field_value = '';
	} else {
		acf_field_value = acf_field_value.substring(str_index);
	}
	// var tmp = element_id.split("[");
	
	// element_id ='['+ tmp[tmp.length - 1];
	// console.log(element_id);
	var HTMLcontext = '<div class="buttons_svg" id="'+element_id +'"><input data-name-acf-field="'+element_id+'" value="'+acf_field_value+'" type="hidden"><div style="color: blue;">Выберите иконку</div>';
	for (var inner of inners){
		// console.log(inner.getAttribute('id')+'  ----  '+svg_select)
		var select = '';
		if (inner.getAttribute('id') === acf_field_value) select=' select';
		HTMLcontext +='<button class="svg-button'+select+'" data-acf-name='+element_id+' type="button" data-id="'+inner.getAttribute('id')+'"><svg src="'+url+'" style="height:20px; width:20px;">'+'<use xlink:href="'+url+'#'+inner.getAttribute('id')+'"  ></use>'+'</svg></button>';

		// console.log(inner.getAttribute('id'));
	}
	HTMLcontext +="</div><style>.svg-button.select{ background-color: #5cff2973; }</style>"
	$(HTMLcontext).insertAfter(element);
 // console.log(document.getElementsByClassName('buttons_svg'));


}
function eventadd()
{
	$('.svg-button').off();
	$('.svg-button').click(function(e) {
		var tmp = ($(e.currentTarget).attr('data-acf-name'));
		var select = ($(e.currentTarget).attr('data-id'));
		var value = document.getElementsByName(tmp)[0].getAttribute('value');
		var str_index=value.indexOf(':');
		if ( -1 === str_index) {
			value = value+select;
		} else {
			value = value.substring(0,str_index)+select;
		}
		console.log(value);
		document.getElementsByName(tmp)[0].setAttribute('value',value);
					// tmp = 'input[name='+tmp+']';
					// console.log(tmp);
					// var data_svg =  document.getElementsByName(tmp);
					// console.log(data_svg);
					// if ('' === data_svg) $('[name="'+tmp+'"]').attr('data-svg',$('[name="'+tmp+'"]').attr('value'));
					// console.log($('[name="'+tmp+'"]').attr('data-svg'));
					// console.log($(e.currentTarget).attr('data-id'));

					$(e.currentTarget).parent().children('.svg-button').removeClass("select");
					$(e.currentTarget).addClass( "select" );
					// $($('[name="'+tmp+'"]')).val($('[name="'+tmp+'"]').attr('data-svg')+$(e.currentTarget).attr('data-id'));
					// console.log($('[name="'+tmp+'"]').attr('data-svg'));

					// $(e.currentTarget).parent().children('input').val($(e.currentTarget).attr('data-id'));
				})
};

function svg_work(element,url){
	console.log('svg_work ',);
	$.ajax({
		type: 'GET',
		url: url,
		success: function(text){
			var tags = text.getElementsByTagName("symbol");
			if ( 0 < tags.length ) {
				$(element).attr('style','display:none;')
				console.log("create html");
				create_innerHTML(tags,element,url);
				eventadd();
			}
		}
	});
}

var callback = function (mutationsList) 
{
	for (var mutation of mutationsList) 
	{
		if (mutation.type == 'childList') {
			if (mutation.target.getAttribute('class')) {
				if (mutation.target.getAttribute('class').includes('attachments')) {
					var obj = {};
					if ( 0 <  mutation.addedNodes.length) {
						obj.action = 'media_loader';
						obj.target = mutation.target;
						obj.img = mutation.addedNodes[0].getElementsByTagName('img')[0];
						obj.url = obj.img.getAttribute('src') 
						if ( 'svg' === get_ext(obj.url)) {
							// console.log(obj.img.currentSrc)
							// console.log('A child node has been added or removed. -- ' + mutation.target.getAttribute('id'));
							handler_child(obj);
						}
					}
				}
			}
		}
		else if (mutation.type == 'attributes') 
		{
			console.log('The ' + mutation.attributeName + ' attribute was modified.');
			var element = mutationsList[0].target;
			var old_ext = get_ext(mutationsList[0].oldValue);
			var src = element.getAttribute('src');
			var ext = get_ext(src);
			if (ext === 'svg') svg_work(element, src);
			if (old_ext === 'svg') clearsiblings(element);
		}
	}
}

var targetsNode = window.document;

var config = { attributes: true, attributeOldValue: true, childList: true, subtree: true, 'attributeFilter': ['src'] };

var observer = new MutationObserver(callback);

if (targetsNode != null) {
	observer.observe(targetsNode, config);
}
(jQuery)(document).ready( function init_svg(){
	console.log('initsvg');
	var control_ext = document.querySelectorAll('[data-name="image"]');
	for (var item of control_ext){
		var src = item.getAttribute('src');
		var ext = get_ext(src);
		if (ext === 'svg'){
			svg_work(item,src,ext);
		}

		// if (item.nextElementSibling.className !== 'buttons_svg'){
		// 	console.log('create innerhtml');
		// }
	}
})
}
)(jQuery)

window.onload = function (){
	var html_temp = document.getElementById('tmpl-attachment');
	var str_template = html_temp.text;
	str_template =  str_template.replace("else if ( 'image' === data.type && data.sizes )", "else if ( 'image' === data.type )");
	html_temp.innerHTML = str_template;
}
