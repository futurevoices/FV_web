import Vue from 'vue';

// Pages
// import defaultpage from '~/components/pagetemplates/defaultpage'

// Blocks
import audioblock from '~/components/blocks/audioblock';
import codeblock from '~/components/blocks/codeblock';
import galleryblock from '~/components/blocks/galleryblock';
import headingblock from '~/components/blocks/headingblock';
import imageblock from '~/components/blocks/imageblock';
import markdownblock from '~/components/blocks/markdownblock';
import listblock from '~/components/blocks/listblock';
import quoteblock from '~/components/blocks/quoteblock';
import textblock from '~/components/blocks/textblock';
import videoblock from '~/components/blocks/videoblock';

// Pages
// Vue.component('Defaultpage', defaultpage);

// Blocks
Vue.component('AudioBlock', audioblock);
Vue.component('CodeBlock', codeblock);
Vue.component('GalleryBlock', galleryblock);
Vue.component('HeadingBlock', headingblock); // IMPORTANT: add 'block' at the end, because some words are reserved, for instance 'image' would not work, but 'imageblock' does
Vue.component('ImageBlock', imageblock);
Vue.component('ListBlock', listblock);
Vue.component('MarkdownBlock', markdownblock);
Vue.component('QuoteBlock', quoteblock);
Vue.component('TextBlock', textblock);
Vue.component('VideoBlock', videoblock);
