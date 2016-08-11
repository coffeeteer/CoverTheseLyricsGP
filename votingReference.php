<?php 
/**
 * @link              https://www.upwork.com/freelancers/~0170bd24e40bc723c6
 *
 * Plugin Name:  	  Custom Voting
 * Plugin URI:        https://www.upwork.com/freelancers/~0170bd24e40bc723c6
 * Description:       Allow the user to vote for videos
 * Version:           1.0.0
 * Author:            Andrij Tkachenko
 * Author URI:        https://www.upwork.com/freelancers/~0170bd24e40bc723c6
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
*/


class CustomVoting {

        /**
         * A reference to an instance of this class.
         */
        private static $instance;

        /**
         * The array of templates that this plugin tracks.
         */
        protected $templates;


        /**
         * Returns an instance of this class. 
         */
        public static function get_instance() {

                if( null == self::$instance ) {
                        self::$instance = new CustomVoting();
                } 

                return self::$instance;

        } 

        /**
         * Initializes the plugin by setting filters and administration functions.
         */
        private function __construct() {

                $this->templates = array();


                // Add a filter to the attributes metabox to inject template into the cache.
                add_filter(
					'page_attributes_dropdown_pages_args',
					 array( $this, 'register_project_templates' ) 
				);


                // Add a filter to the save post to inject out template into the page cache
                add_filter(
					'wp_insert_post_data', 
					array( $this, 'register_project_templates' ) 
				);


                // Add a filter to the template include to determine if the page has our 
				// template assigned and return it's path
                /*add_filter(
					'template_include', 
					array( $this, 'view_project_template') 
				);
				*/
				
				add_filter(
					'the_content', 
					array($this, 'replace_content'),
					20 
				);

                // Add your templates to this array.
                $this->templates = array(
                    'custom-voting-template.php' => 'Custom Voting Page',
                );
				
				
				add_action('wp_ajax_custom_vote', array( $this, 'ajax_vote' ));
				add_action('wp_ajax_nopriv_custom_vote', array( $this, 'ajax_vote' ));
				
				
				add_action('edit_form_after_title', array( $this, 'show_results' ));
				 
        } 
		
		public function show_results(){
			global $wpdb, $post;
			
			$template = get_post_meta($post->ID, '_wp_page_template', true);
			if($template != 'custom-voting-template.php') return $content;
			
			$results = $wpdb->get_results("
				SELECT 
				COUNT( * ) AS count, video AS video
				FROM `{$wpdb->prefix}custom_voting` 
				WHERE `post_id` = {$post->ID}
				GROUP BY `video` 
				ORDER BY `count` DESC 
				LIMIT 0, 30
			");
			?>
			<table style="width:100%;text-align:left;">
			<thead>
				<th>Video</th>
				<th>Votes</th>
			</thead>
			<tbody>
				<?php foreach($results as $result){?>

				<tr>
					<td><?php echo $result->video; ?></td>
					<td><?php echo $result->count; ?></td>
				</tr>
				<?php } ?>
			</tbody>
			</table>
			<?php
		}
		

        /**
         * Adds our template to the pages cache in order to trick WordPress
         * into thinking the template file exists where it doens't really exist.
         *
         */

        public function register_project_templates( $atts ) {

                // Create the key used for the themes cache
                $cache_key = 'page_templates-' . md5( get_theme_root() . '/' . get_stylesheet() );

                // Retrieve the cache list. 
				// If it doesn't exist, or it's empty prepare an array
				$templates = wp_get_theme()->get_page_templates();
                if ( empty( $templates ) ) {
                        $templates = array();
                } 

                // New cache, therefore remove the old one
                wp_cache_delete( $cache_key , 'themes');

                // Now add our template to the list of templates by merging our templates
                // with the existing templates array from the cache.
                $templates = array_merge( $templates, $this->templates );

                // Add the modified cache to allow WordPress to pick it up for listing
                // available templates
                wp_cache_add( $cache_key, $templates, 'themes', 1800 );

                return $atts;

        } 
			
		public function replace_content($content){
			
			global $post;
			$template = get_post_meta($post->ID, '_wp_page_template', true);
			
			if($template != 'custom-voting-template.php') return $content;
			
			$videos = get_field('videos', $post->ID);
			if(empty($videos)) return $content;
			
			ob_start();
			
			$cols = array();
			$i=0;
			foreach($videos as $index=>$value) {
				$i++;
				if ($i == 1) {
					$cols[1][$index] = $value;
				}
				if ($i == 2) {
					$cols[2][$index] = $value;
				}
				if ($i == 3){ 
					$cols[3][$index] = $value;
					$i = 0;
				}
			}
			
			?>
			<style>
			.vote_btn {
			  position: relative;
			  background: #3498db;
			  background-image: -webkit-linear-gradient(top, #3498db, #2980b9);
			  background-image: -moz-linear-gradient(top, #3498db, #2980b9);
			  background-image: -ms-linear-gradient(top, #3498db, #2980b9);
			  background-image: -o-linear-gradient(top, #3498db, #2980b9);
			  background-image: linear-gradient(to bottom, #3498db, #2980b9);
			  -webkit-border-radius: 3px;
			  -moz-border-radius: 3px;
			  border-radius: 3px;
			  font-family: Arial;
			  color: #ffffff;
			  font-size: 12px;
			  padding: 6px 10px 6px 34px;
			  border: solid #1f628d 1px;
			  text-decoration: none;
			  text-align: right;
			  cursor: pointer;
			}
			
			.vote_btn > span{
				position: absolute;
				left: 0;
				top: 0;
				height: 100%;
				width: 26px;
				padding: 6px 0;
				text-align: center;
				border-right: 1px solid #1f628d;
			}
			
			.vote_btn:hover {
			  background: #3cb0fd;
			  background-image: -webkit-linear-gradient(top, #3cb0fd, #3498db);
			  background-image: -moz-linear-gradient(top, #3cb0fd, #3498db);
			  background-image: -ms-linear-gradient(top, #3cb0fd, #3498db);
			  background-image: -o-linear-gradient(top, #3cb0fd, #3498db);
			  background-image: linear-gradient(to bottom, #3cb0fd, #3498db);
			  text-decoration: none;
			}
			
			.vote_btn.disabled{
				background: #999999 !important;
				border-color: gray !important;
				cursor:progress !important
			}
			
			.vote_btn.disabled span{
				border-color: gray !important;
			}
			</style>
			<script>
				jQuery(document).ready(function(){
					
					//custom_vote
					jQuery('button.vote_btn').click(function(event){
						event.preventDefault();
						
						var button = jQuery(this);
						
						if(button.hasClass('disabled')) return;
						button.addClass('disabled');
						
						jQuery.post('<?php echo admin_url('admin-ajax.php'); ?>', {
							'action': 'custom_vote',
							'post_id': '<?php echo $post->ID; ?>',
							'video': button.data('video')
						}, function(data){
							button.removeClass('disabled');
							if(data.message != false) alert(data.message);
							if(data.result == true){
								var count = parseInt(button.find('span').html());
								button.find('span').html(count+1);
								var count = parseInt(jQuery('h2.votes_left > span').html());
								jQuery('h2.votes_left > span').html(count-1);
							}
						});
					});
					
				});
			</script>
			<div class="et_pb_section  et_pb_section_0 et_pb_with_background et_section_regular">
				<div class=" et_pb_row et_pb_row_0">
				<h2 style="color:white;text-align:center;" class="votes_left">You have <span><?php echo 5-self::count_ip_votes(self::get_ip(), $post->ID); ?></span> votes</h2>
				<?php foreach($cols as $col=>$data){ ?>
				<div class="et_pb_column et_pb_column_1_3 et_pb_column_<?php echo $col; ?>">
					<?php foreach($data as $index=>$one) { 
					$video = get_post_meta($post->ID, 'videos_'.$index.'_video', true);
					?>
					<div class="et_pb_module et_pb_video et_pb_video_0">
						<div class="et_pb_video_box">
							<div class="fluid-width-video-wrapper" style="padding-top: 56.2963%;"><?php echo $one['video']; ?></div>
						</div>
					</div>
				
					<div class="et_pb_text et_pb_module et_pb_bg_layout_light et_pb_text_align_left">
						<?php echo $one['text']; ?>
						
					<button class="vote_btn" data-video="<?php echo $video; ?>"><span><?php echo self::count_ip_votes(self::get_ip(), $post->ID, $video, false); ?></span>Vote</button>
					</div> <!-- .et_pb_text -->
					<?php } ?>
					<hr class="et_pb_module et_pb_space et_pb_divider_0 et-hide-mobile">
					
				</div> <!-- .et_pb_column -->
				<?php } ?>
					
				</div> <!-- .et_pb_row -->
				
			</div>
			<?php 
			return ob_get_clean();
		
		}
		
		
		
		public static function ajax_vote(){
		    
			global $wpdb;
			
			$json = array(
				'result' => false,
				'message' => false
			);
			
			
			$user_ip = self::get_ip();
			$post_id = intval($_POST['post_id']);
			$video = esc_attr($_POST['video']);
			
			$voted_times = self::count_ip_votes($user_ip, $post_id);
			
			if($voted_times >= 5) {
				$json['message'] = 'Your limit is reached';
				wp_send_json($json);
			} else {
				$result = self::add_vote($user_ip, $post_id, $video);
				$json['result'] = true;
			}
			
			wp_send_json($json);
		}
		
		public static function add_vote($ip, $post_id, $video){
			
			global $wpdb;
			
			$result = $wpdb->insert($wpdb->prefix.'custom_voting', array(
				'post_id' => $post_id,
				'ip' => $ip,
				'video' => $video
			), array('%d', '%s', '%s'));
			
			if($result > 0) {
				return true;
			} else {
				return false;
			}
		}
		
		public static function count_ip_votes($ip = false, $post_id, $video = false, $last_day = true){
			
			global $wpdb;
			
			$query = $wpdb->prepare("SELECT COUNT(*)
				FROM {$wpdb->prefix}custom_voting
				WHERE `post_id` = %d
			", $post_id);
			
			if($ip != false) {
				$query .= $wpdb->prepare("AND `ip` = %s", $ip);
			}
			
			if($video != false) {
				$query .= $wpdb->prepare("AND `video` = %s", $video);
			}
			
			if($last_day) {
				$date = date("Y-m-d H:i:s", time()-86400);
				$query .= "
					AND CONVERT_TZ(`time`, @@session.time_zone, '+0:00') > '{$date}'
				";
			}

			
			return (int)$wpdb->get_var($query);
			
		}
		
		public static function get_ip(){
				
				switch(true){
				  case (!empty($_SERVER['HTTP_X_REAL_IP'])) : return $_SERVER['HTTP_X_REAL_IP'];
				  case (!empty($_SERVER['HTTP_CLIENT_IP'])) : return $_SERVER['HTTP_CLIENT_IP'];
				  case (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) : return $_SERVER['HTTP_X_FORWARDED_FOR'];
				  default : return $_SERVER['REMOTE_ADDR'];
				}
				
		}
		
		public static function create_table(){
			/* CREATE TABLE  `wp_hgxm_custom_voting` (
			 `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
			 `ip` VARCHAR( 255 ) NOT NULL ,
			 `video` VARCHAR( 255 ) NOT NULL ,
			 `time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
			) ENGINE = INNODB;
			*/
		}
		
        /**
         * Checks if the template is assigned to the page
         */
        public function view_project_template( $template ) {

                global $post; 
				
                if (!isset($this->templates[get_post_meta( 
					$post->ID, '_wp_page_template', true 
				)] ) ) {
                        return $template;
						
                } 

                $file = plugin_dir_path(__FILE__). get_post_meta( 
					$post->ID, '_wp_page_template', true 
				);
				
                // Just to be safe, we check if the file exist first
                if( file_exists( $file ) ) {
                        return $file;
                } 
				else { echo $file; }

     