/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	BlockControls,
	InspectorControls,
	JustifyContentControl,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	Button,
	PanelBody,
	RangeControl,
	ToolbarGroup,
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
		justification,
	} = attributes;

	const onClickStarButton = ( currentRating, starClicked ) => {
		// Check if the current rating was clicked again => then go down 0.5 in rating.
		if ( starClicked === Math.ceil( currentRating ) ) {
			setAttributes( { rating: currentRating - 0.5 } );
		}
		// Otherwise set rating to the star that was clicked.
		else {
			setAttributes( { rating: starClicked } );
		}
	};

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

	const blockProps = useBlockProps( {
		className: classnames( {
			[ `items-justified-${ justification }` ]: justification,
		} )
	} );

	const iconStyles = {
		width: iconSize,
		height: iconSize,
	};

	// Create star icons array.
	let icons = [];
    for ( let i = 0; i < maxRating; i++ ) {
		// Start with full stars.
		if ( i < Math.floor( rating ) ) {
			icons.push( starFilled );
		}
		// Check for half stars.
		else if ( i === Math.floor( rating ) && rating % 1 !== 0 ) {
			icons.push( starHalf );
		}
		// Fill up with empty stars.
		else {
			icons.push( starEmpty );
		}
	}

	// Wrap each star icon with span tag and add styles.
	const stars = icons.map( ( icon, i ) => (
		<span className={ `star star-${ i + 1 }` } style={ iconStyles }>
			<Icon key={ i } icon={ icon } />
		</span>
	) );

	return (
		<>
			<BlockControls group="block">
				<ToolbarGroup>
					<JustifyContentControl
						allowedControls={ [ 'left', 'center', 'right' ] }
						value={ justification }
						onChange={ ( value ) => setAttributes( { justification: value } ) }
					/>
				</ToolbarGroup>
			</BlockControls>
					
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
				{ ! isSelected && stars.map( ( star ) => star ) }
				
				{ isSelected && stars.map( ( star, i ) => (
					<Button
						key={ i }
						className="themezee-components-star-icon-button"
						onClick={ () => onClickStarButton( rating, i + 1 ) }
					>
						{ star }
					</Button>
				) ) }

			</div>
		</>
	);
}
