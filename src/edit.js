/**
 * External dependencies
 */
//import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( {
	attributes,
	setAttributes,
} ) {
	const {
		rating,
	} = attributes;

	const blockProps = useBlockProps();

	console.log( rating );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'themezee-star-rating-block' ) } initialOpen={ true }>
					<RangeControl
						label={ __( 'Rating', 'themezee-star-rating-block' ) }
						value={ rating }
						min={ 0 }
						max={ 5 }
						step={ 0.5 }
						withInputField={ true }
						onChange={ ( value ) => setAttributes( { rating: value } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ rating }
			</div>
		</>
	);
}
