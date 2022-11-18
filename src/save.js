/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import {
	Icon,
	starEmpty,
	starHalf,
	starFilled,
} from '@wordpress/icons';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save( { attributes } ) {
	const {
		rating,
		maxRating,
		iconSize,
		justification,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: classnames( {
			[ `items-justified-${ justification }` ]: justification,
		} ),
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
		<div { ...blockProps }>
			{ stars.map( ( star ) => star ) }
		</div>
	);
}
