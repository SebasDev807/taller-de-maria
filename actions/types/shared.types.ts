/**
 * Resultado genérico para cualquier Server Action.
 * Discrimina entre éxito y error con un campo `success`.
 */
export type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: string };
