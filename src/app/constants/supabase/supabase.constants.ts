export enum SupabaseTables {
  Streams = 'streams',
}

export abstract class SupabaseQuery {
  static readonly Streams: string = `
    *,
    chapters (
      id,
      offset,
      duration,
      game:games ( id, title, description, slug, thumbnailUrl )
    ),
    tags ( id, name )
  `;
}
