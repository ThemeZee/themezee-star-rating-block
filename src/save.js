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
	} = attributes;

	const blockProps = useBlockProps.save();

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
		<div { ...blockProps }>
			{ stars.map( ( star ) => star ) }
		</div>
	);
}
