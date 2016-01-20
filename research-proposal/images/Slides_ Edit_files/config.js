
/**
 * A custom plugin which removes needless "&nbsp;" entities
 * after text has been edited. For example:
 */
CKEDITOR.plugins.add( 'remove-extra-nbsp', {
	afterInit: function( editor ) {
		var dataProcessor = editor.dataProcessor,
			htmlFilter = dataProcessor && dataProcessor.htmlFilter;

		if ( htmlFilter ) {

			htmlFilter.addRules( {
				text: function( text ) {
					// Using variable replace since JS does not support negative
					// lookbehind.
					// Only nbsp entities that are neither preceded or followed by
					// whitespace or an opening/closing HTML tag are replaced.
					//
					// Examples:
					// - "&nbsp;" 					-> UNCHANGED
					// - "AAA&nbsp;BBB" 			-> "AAA BBB"
 					// - "AAA&nbsp;&nbsp;BBB" 		-> "AAA &nbsp;BBB"
 					// - "AAA &nbsp; &nbsp; BBB" 	-> UNCHANGED
 					// - "<em>&nbsp;</em>" 			-> UNCHANGED
 					if( text !== '&nbsp;' ) {
						text.replace( /(\s)?&nbsp;(?!\s)/gi, function( $0, $1 ){
							return $1 ? $0 : ' ';
						} );
					}

					return text;
				}
			}, {
				applyToAll: true,
				excludeNestedEditable: true
			} );

		}
	}
});

/**
 * Slides CKEditor configuration.
 */
CKEDITOR.editorConfig = function( config ) {

	// Configure toolbar options
	config.toolbar = [
		[ 'Format', 'FontSize', 'TextColor' ],
		[ 'Bold', 'Italic', 'Underline', 'Strike', '-', 'RemoveFormat' ],
		[ 'NumberedList', 'BulletedList', '-', 'Blockquote' ],
		[ 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ],
		[ 'Link', 'Unlink' ]
	];

	config.allowedContent = {
		'h1 h2 h3 h4 h5 h6 p ul ol li blockquote span pre table col td tr': {
			styles: 'text-align,font-size,color',
			classes: 'fragment'
		},
		'strong em u s del ins': true,
		'a': {
			attributes: '!href,target',
			classes: 'fragment'
		}
	};

	// Custom styles for the parts of CKE that are loaded into iframes (like dropdowns)
	config.contentsCss = '/ckeditor/slides/editor.css';

	// Always paste as plain text
	// config.forcePasteAsPlainText = true;

	// Remove word formatting
	config.pasteFromWordRemoveFontStyles = true;
	config.pasteFromWordRemoveStyles = true;

	// Don't disable browser/OS spell checking
	config.disableNativeSpellChecker = false;

	// Available font sizes (label/value)
	config.fontSize_sizes = '50%/0.5em;70%/0.7em;90%/0.9em;100%/1.0em;120%/1.2em;140%/1.4em;160%/1.6em;180%/1.8em;200%/2.0em;250%/2.5em;300%/3.0em;400%/4.0em;500%/5.0em';

	// Tags that appear in font format options
	config.format_tags = 'p;h1;h2;h3;pre';

	// Make dialogs simpler
	config.removeDialogTabs = 'image:advanced;link:advanced';

	// Enable plugins
	config.extraPlugins = 'link,font,remove-extra-nbsp,panelbutton,colorbutton';

	// Disable plugins
	config.removePlugins = 'elementspath,contextmenu';

	// Disable buttons
	config.removeButtons = 'Underline,Subscript,Superscript';

	// Don't insert invisible characters to fill empty elements
	// When this is set to false, new text blocks are unusable
	// CKEDITOR.config.fillEmptyBlocks = false;

};
