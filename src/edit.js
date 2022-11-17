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
import {
	Icon,
	starEmpty,
	starHalf,
	starFilled,
} from '@wordpress/icons';

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
		maxRating,
	} = attributes;

	const blockProps = useBlockProps();

	let stars = [];
    for ( let i = 0; i < maxRating; i++ ) {
		
		// Start with full stars.
		if ( i < Math.floor( rating ) ) {
			stars.push(
				<Icon
					key={ i }
					icon={ starFilled }
				/>
			);
		}

		// Check for half stars.
		else if ( i === Math.floor( rating ) && rating % 1 !== 0 ) {
			stars.push(
				<Icon
					key={ i }
					icon={ starHalf }
				/>
			);
		}

		// Fill up with empty stars.
		else {
			stars.push(
				<Icon
					key={ i }
					icon={ starEmpty }
				/>
			);
		}
    }

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'themezee-star-rating-block' ) } initialOpen={ true }>
					<RangeControl
						label={ __( 'Rating', 'themezee-star-rating-block' ) }
						value={ rating }
						min={ 0 }
						max={ maxRating }
						step={ 0.5 }
						withInputField={ true }
						onChange={ ( value ) => setAttributes( { rating: value } ) }
					/>
					<RangeControl
						label={ __( 'Maximum rating score', 'themezee-star-rating-block' ) }
						value={ maxRating }
						min={ 0 }
						max={ 25 }
						step={ 1 }
						withInputField={ true }
						onChange={ ( value ) => setAttributes( { maxRating: value } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ stars.map( ( star ) => star ) }
			</div>
		</>
	);
}
