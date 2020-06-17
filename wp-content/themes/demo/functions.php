<?php

/**
 * 
 * Remove default POST option from WordPress theme
 * 
 */
function post_remove() {
  remove_menu_page( 'edit.php' );
}

add_action( 'admin_menu', 'post_remove' );

function remove_wp_nodes() {
  global $wp_admin_bar;
  $wp_admin_bar->remove_node( 'new-post' );
}

add_action( 'admin_bar_menu', 'remove_wp_nodes', 999 );

/**
 * 
 * Flush theme rewrite rules
 * 
 */
function theme_prefix_rewrite_flush() {
  flush_rewrite_rules();
}

add_action( 'after_switch_theme', 'theme_prefix_rewrite_flush' );

/**
 * 
 * Custom post type: Blog
 * 
 */
function custom_post_blog() {
  $labels = array(
    'name' => _x( 'Blogs', 'post type general name' ),
    'singular_name' => _x( 'Blog', 'post type singular name' ),
    'add_new' => _x( 'Add New', 'blog' ),
    'add_new_item' => __( 'Add New Blog' ),
    'edit_item' => __( 'Edit Blog' ),
    'new_item' => __( 'New Blog' ),
    'all_items' => __( 'All Blogs' ),
    'view_item' => __( 'View Blog' ),
    'search_items' => __( 'Search Blogs' ),
    'not_found' => __( 'No blogs found' ),
    'not_found_in_trash' => __( 'No blogs found in the Trash' ),
    'parent_item_colon' => '’',
    'menu_name' => 'Blogs',
  );

  $supports = array( 'title', 'editor', 'thumbnail', 'excerpt', 'author', 'revisions' );

  $args = array(
    'labels' => $labels,
    'description' => 'Holds our blog and any blog-related data',
    'public' => true,
    'menu_position' => 5,
    'supports' =>  $supports,
    'graphql_single_name' => 'Blog',
    'graphql_plural_name' => 'Blogs',
    'has_archive' => true,
    'show_in_rest' => true,
    'show_in_graphql' => true,
  );
  
  register_post_type( 'blog', $args );
}

add_action( 'init', 'custom_post_blog' );

/**
 * 
 * Custom interaction messages
 * 
 */
function updated_messages( $messages ) {
  global $post, $post_ID;

  $messages['blog'] = array(
    0 => '’',
    1 => sprintf( __( 'Blog updated. <a href="%s">View Blog</a>' ), esc_url( get_permalink( $post_ID ) ) ),
    2 => __( 'Custom field updated' ),
    3 => __( 'Custom field deleted' ),
    4 => __( 'Blog updated' ),
    5 => isset( $_GET['revision'] ) ? sprintf( __( 'Blog restored to revision from %s' ), wp_post_revision_title( (int) $_GET['revision'], false ) ) : false,
    6 => sprintf( __( 'Blog published. <a href="%s">View blog</a>' ), esc_url( get_permalink( $post_ID ) ) ),
    7 => __( 'Blog saved' ),
    8 => sprintf( __( 'Blog submitted. <a target="_blank" href="%s">Preview blog</a>' ), esc_url( add_query_arg( 'preview', 'true', get_permalink($post_ID) ) ) ),
    9 => sprintf( __( 'Blog scheduled for: <strong>%1$s</strong>. <a target="_blank" href="%2$s">Preview blog</a>' ), date_i18n( __( 'M j Y @ G:i' ), strtotime( $post->post_date ) ), esc_url( get_permalink( $post_ID ) ) ),
    10 => sprintf( __( 'Blog draft updated. <a target="_blank" href="%s">Preview blog</a>' ), esc_url( add_query_arg( 'preview', 'true', get_permalink( $post_ID ) ) ) ),
  );

  return $messages;
}

add_action( 'post_updated_messages', 'updated_messages' );

/**
 * 
 * Custom taxonomies
 * 
 */
function taxonomies_blog() {
  $labels = array(
    'name' => _x( 'Blog Categories', 'taxonomy general name' ),
    'singular_name' => _x( 'Blog Category', 'taxonomy general name' ),
    'search_items' => __( 'Search Blog Categories' ),
    'all_items' => __( 'All Blog Categories' ),
    'parent_item' => __( 'Parent Blog Category' ),
    'parent_item_colon' => __( 'Parent Blog Category:' ),
    'edit_item' => __( 'Edit Blog Category' ),
    'update_item' => __( 'Update Blog Category' ),
    'add_new_item' => __( 'Add New Blog Category' ),
    'new_item_name' => __( 'New Blog Category' ),
    'menu_name' => __( 'Blog Categories' ),
  );

  $args = array(
    'labels' => $labels,
    'hierarchical' => true,
  );

  register_taxonomy( 'blog_category', 'blog', $args );
}

add_action( 'init', 'taxonomies_blog', 0 );

/**
 * 
 * Register custom blocks
 * 
 */
function register_demo_block() {
  wp_register_script('demo-block-js',
    get_template_directory_uri() . '/dist/editor-index.js',
    ['wp-element', 'wp-blocks', 'wp-editor', 'wp-compose', 'wp-data']
  );

  wp_register_style('demo-block-css',
    get_template_directory_uri() . '/dist/index.css'
  );

  $directories = glob(get_template_directory().'/src/blocks/*', GLOB_ONLYDIR);

  foreach ($directories as $block) {
    $name = str_replace(get_template_directory().'/src/blocks/', '', $block);

    register_block_type('demo/'.$name,
      [
        'editor_script' => 'demo-block-js',
        'editor_style' => 'demo-block-css',
        'style' => 'demo-block-css',
      ]
    );
  }
}

add_action( 'init', 'register_demo_block' );

function child_enqueue_style() {
  wp_enqueue_style('demo-style',
    get_template_directory_uri().'/dist/index.css'
  );

  wp_enqueue_script('demo-script',
    get_template_directory_uri().'/dist/index.js',
    [],
    false,
    true,
  );
}

add_action( 'wp_enqueue_scripts', 'child_enqueue_style' );

/**
 * 
 * Filter blocks
 * 
 */
function allowed_block_types( $allowed_block_types, $post ) {
  if ($post->post_type == 'blog') {
    return array(
      'demo/hero-blog',
      'demo/heading',
      'demo/paragraph',
      'demo/image',
    );
  }
}

add_action( 'allowed_block_types', 'allowed_block_types', 10, 2 );

/**
 * 
 * Pre-fill post
 * 
 */
function pre_fill_post($content) {
  global $_REQUEST;
  $new_content = $content;

  if ($_REQUEST['post_type'] == 'blog') {
    return '<!-- wp:demo/hero-blog /-->' . $content;
  }
}

add_filter( 'default_content', 'pre_fill_post' );

/**
 * 
 * Custom media sizes
 * 
 */
add_theme_support( 'post-thumbnails' );

function child_custom_sizes($sizes) {
  return array_merge($sizes, array(
    'mobile' => __('Mobile (hard crop)'),
    'tablet' => __('Tablet (hard crop)'),
    'desktop' => __('Desktop (hard crop)'),
  ));
}

add_image_size('mobile', 767);
add_image_size('tablet', 1279);
add_image_size('desktop', 1366);
add_filter('image_size_names_choose', 'child_custom_sizes');

/**
 * 
 * Remove Gutenberg wrapper style
 * 
 */
function remove_guten_wrapper_styles( $settings ) {
  unset($settings['styles'][0]);

  return $settings;
}
add_filter( 'block_editor_settings' , 'remove_guten_wrapper_styles' );