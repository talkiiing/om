export interface CreateDatasetDto {
  /**
   * Можно передать данные напрямую...
   */
  data?: any;

  /**
   * ...а можно передать ссылку
   */
  source?: string;

  /**
   * ...а можно передать Pipeline ID
   */
  pipeline?: string;

  /**
   * Название датасета
   */
  name: string;
}
