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
	Button,
	PanelBody,
	RangeControl,
	__experimentalUseCustomUnits as useCustomUnits,
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
import UnitRangeControl from './unit-range-control';
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
	isSelected,
	setAttributes,
} ) {
	const {
		rating,
		maxRating,
		iconSize,
	} = attributes;

	const units = useCustomUnits( {
		availableUnits: [
			'px',
			'em',
			'rem',
			'vw',
			'vh',
		],
		defaultValues: { px: 32, em: 2, rem: 2, vw: 2, vh: 4 },
	} );

	const blockProps = useBlockProps();

	const iconStyles = {
		width: iconSize,
		height: iconSize,
	};

	let stars = [];
    for ( let i = 0; i < maxRating; i++ ) {

		// Start with full stars.
		if ( i < Math.floor( rating ) ) {
			stars.push(
				<Button
					key={ i }
					className="themezee-components-star-icon-button"
					onClick={ () => {
						// Check if the current rating was clicked => then change full to half star.
						if ( i + 1 === rating ) {
							setAttributes( { rating: i + 0.5 } );
						} else {
							setAttributes( { rating: i + 1 } );
						}
					} }
				>
					<span className={ `star star-${ i + 1 }` } style={ iconStyles }>
						<Icon icon={ starFilled } />
					</span>
				</Button>
			);
		}

		// Check for half stars.
		else if ( i === Math.floor( rating ) && rating % 1 !== 0 ) {
			stars.push(
				<Button
					key={ i }
					className="themezee-components-star-icon-button"
					onClick={ () => setAttributes( { rating: i } ) }
				>
					<span className={ `star star-${ i + 1 }` } style={ iconStyles }>
						<Icon icon={ starHalf } />
					</span>
				</Button>
			);
		}

		// Fill up with empty stars.
		else {
			stars.push(
				<Button
					key={ i }
					className="themezee-components-star-icon-button"
					onClick={ () => setAttributes( { rating: i + 1 } ) }
				>
					<span className={ `star star-${ i + 1 }` } style={ iconStyles }>
						<Icon icon={ starEmpty } />
					</span>
				</Button>
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
					<UnitRangeControl
						label={ __( 'Icon size', 'themezee-star-rating-block' ) }
						value={ iconSize }
						onChange={ ( value ) => setAttributes( { iconSize: value} ) }
						units = { units }
						max = { {
							'px': 240,
							'em': 15,
							'rem': 15,
							'vw': 15,
							'vh': 15,
						} }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ stars.map( ( star ) => star ) }
			</div>
		</>
	);
}
