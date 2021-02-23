export function __resolveType(obj, context, info) {
  if (obj.bio != null) {
    return 'User';
  }
  if (obj.description != null) {
    return 'Project';
  }
  if (obj.title != null) {
    return 'Announcement';
  }
  return null;
}
