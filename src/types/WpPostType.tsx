export type WpPostType = {
  /**
   * Unique identifier for the object.
   */
  id: number;
  /**
   * The title for the object.
   */
  title?: {
    /**
     * HTML title for the object, transformed for display.
     */
    rendered?: string;
    [k: string]: unknown;
  };
  /**
   * The excerpt for the object.
   */
  excerpt?: {
    /**
     * HTML excerpt for the object, transformed for display.
     */
    rendered?: string;
    [k: string]: unknown;
  };
  /**
   * The content for the object.
   */
  content?: {
    /**
     * HTML content for the object, transformed for display.
     */
    rendered?: string;
    [k: string]: unknown;
  };
  /**
   * URL to the object.
   */
  link?: string;

  "_embedded": any;
  /**
   * The date the object was published, in the site's timezone.
   */
  date?: string;
  /**
   * The globally unique identifier for the object.
   */
  guid?: {
    /**
     * GUID for the object, transformed for display.
     */
    rendered?: string;
    [k: string]: unknown;
  };
  /**
   * The date the object was last modified, in the site's timezone.
   */
  modified?: string;
  /**
   * An alphanumeric identifier for the object unique to its type.
   */
  slug?: string;
  /**
   * A named status for the object.
   */
  status?: "publish" | "future" | "draft" | "pending" | "private";
  /**
   * Type of Post for the object.
   */
  type?: string;
  /**
   * The ID for the author of the object.
   */
  author?: number;
  /**
   * The terms assigned to the object in the category taxonomy.
   */
  categories?: number[];
  /**
   * The terms assigned to the object in the post_tag taxonomy.
   */
  tags?: number[];
  [k: string]: unknown;
};
