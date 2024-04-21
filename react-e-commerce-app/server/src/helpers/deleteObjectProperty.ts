import { omit } from 'lodash';

type SourceObject = Record<string, any>;

export const deleteProperties = (
	sourceObject: SourceObject,
	props: string[]
): SourceObject => {
	return omit(sourceObject, props);
};
