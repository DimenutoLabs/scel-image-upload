(function ( $ ) {

            $.fn.scelUploader = function(options) {

                var settings = $.extend({
                    input: {
                        name: "attachments"
                    },
                    previewZone: {
                        name: "file-preview-zone"
                    },
                    backgroundColor: "white"
                }, options );

                var self = this;

                this.click(function() {
                    var attachments = $('.scel-attachments');
                    var quantity = attachments.length;
                    var next = 0;
                    if( (last = attachments.get((quantity*1)-1)) !== undefined ) {
                        next = $(last).attr('data-id')*1+1;
                    }
                    var newElement = $('<input type="file" class="scel-attachments d-none" name="' + settings.input.name + '[]" data-id="' + next + '">');
                    newElement.appendTo("#" + settings.previewZone.name );
                    newElement.click();
                });

                $(document).on('change', '.scel-attachments', function() {
                    self.readUrl( this, "#" + settings.previewZone.name );
                });

                $(document).on('click', '.scel-preview-image-delete-button', function() {
                    var id = $(this).attr('data-id');
                    $('.scel-attachments[data-id="' + id + '"]').remove();
                    $('.scel-preview-image-container[data-id="' + id + '"]').remove();
                });
            };

            $.fn.readUrl = function(input, zone) {
                if (input.files && input.files[0]) {

                    for ( i = 0; i < input.files.length; i++ ) {

                        var reader = new FileReader();
                        reader.readAsDataURL(input.files[i]);

                        reader.onload = (function (id) {
                            return function (e) {
                                $(zone).append( '<div class="col-2 col-xs-4 text-center scel-preview-image-container" data-id="' + id + '" style="margin-top: 15px; overflow: hidden">' +
                                    '<div style="background: #FFF; padding: 5px; border: 4px dotted #EEE; position: relative">' +
                                        '<div style="position: absolute; top: 0; right: 0"><button type="button" class="btn btn-danger scel-preview-image-delete-button" data-id="' + id + '"><i class="fa fa-fw fa-trash"></i></button></div>' +
                                            '<img src="' + e.target.result + '" height="120">' +
                                        '</div>' +
                                    '</div>' );
                            }
                        })(input.getAttribute('data-id'))

                    }
                }
            }


        }( jQuery ));
