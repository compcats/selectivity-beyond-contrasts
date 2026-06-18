// constants.js — shared constants for all interactive plots

const ORDERED_MODELS = {
  vitb16siglip2res224:        'ViT-B/16 SigLIP2',
  resnet50openaiclip:         'ResNet-50 CLIP',
  convnexttinyimagenet1kv1:   'ConvNeXt-Tiny ImageNet-1K',
  resnet101openaiclip:        'ResNet-101 CLIP',
  vitb14dinov2reg:            'ViT-B/14 DINOv2-Registers',
  resnet50simclr:             'ResNet-50 SimCLR',
  resnet50toponettau30:       'ResNet-50 TopoNet',
  cornets:                    'CORNet-S',
  resnet101imagenet1kv1:      'ResNet-101 ImageNet-1K',
  vitb14dinov2:               'ViT-B/14 DINOv2',
  resnet50cesslbarlowtop:     'ResNet-50 CE-SSL',
  resnet18imagenet1kv1:       'ResNet-18 ImageNet-1K',
  resnet50imagenet1kv2:       'ResNet-50 ImageNet-1K',
  resnet50faceobfuscation:    'ResNet-50 Face-Obfuscated',
  vitb16eva028bs8bb131k:      'ViT-B/16 EVA-02',
  resnet50ecoset:             'ResNet-50 EcoSet',
  vitl14kosmos2:              'ViT-L/14 KOSMOS-2',
  vitb16synclr:               'ViT-B/16 SynCLR',
  resnet18tdannsimclrlw1:     'ResNet-18 TDANN-SimCLR',
  vgg16imagenet1kv1:          'VGG-16 ImageNet-1K',
  vitb32openaiclip:           'ViT-B/32 CLIP',
  vitb16openaiclip:           'ViT-B/16 CLIP',
  vitl14openaiclip:           'ViT-L/14 CLIP',
  resnet50robustl2eps3:       'ResNet-50 Robust',
  vitb32dreamsimopenclip:     'ViT-B/32 DreamSim',
  resnet50blurstrong:         'ResNet-50 Blur-Trained',
  resnet50sin:                'ResNet-50 Shape-Trained',
  bagnet33:                   'BagNet-33 ImageNet-1K',
  vitb32imagenet1kv1:         'ViT-B/32 ImageNet-1K',
  alexnetimagenet1kv1:        'AlexNet ImageNet-1K',
  alexnetbarlowtwins:         'AlexNet BarlowTwins',
  vitb16imagenet21k:          'ViT-B/16 ImageNet-21K',
  resnet18tdannsupervisedlw10:'ResNet-18 TDANN-Supervised',
  cornetz:                    'CORNet-Z',
  alexnetipclref01:           'AlexNet IPCL',
  // Untrained
  alexnetrandom1:  'AlexNet Random 1',
  alexnetrandom2:  'AlexNet Random 2',
  alexnetrandom3:  'AlexNet Random 3',
  alexnetrandom4:  'AlexNet Random 4',
  alexnetrandom5:  'AlexNet Random 5',
  resnet18random1: 'ResNet-18 Random 1',
  resnet18random2: 'ResNet-18 Random 2',
  resnet18random3: 'ResNet-18 Random 3',
  resnet18random4: 'ResNet-18 Random 4',
  resnet18random5: 'ResNet-18 Random 5',
  resnet50random1: 'ResNet-50 Random 1',
  resnet50random2: 'ResNet-50 Random 2',
  resnet50random3: 'ResNet-50 Random 3',
  resnet50random4: 'ResNet-50 Random 4',
  resnet50random5: 'ResNet-50 Random 5',
  vitb32random1:   'ViT-B/32 Random 1',
  vitb32random2:   'ViT-B/32 Random 2',
  vitb32random3:   'ViT-B/32 Random 3',
  vitb32random4:   'ViT-B/32 Random 4',
  vitb32random5:   'ViT-B/32 Random 5',
};

const MODEL_LAYERS = {
  alexnetimagenet1kv1: { face: 'features.11', body: 'features.12', scene: 'features.12' },
  alexnetipclref01: { face: 'conv_block_5.1', body: 'conv_block_5.3', scene: 'conv_block_5.0' },
  alexnetbarlowtwins: { face: 'backbone.4.1', body: 'backbone.4.2', scene: 'backbone.4.3' },
  vgg16imagenet1kv1: { face: 'features.30', body: 'features.30', scene: 'features.30' },
  resnet18imagenet1kv1: { face: 'layer4.1.relu1', body: 'layer4.1.relu2', scene: 'layer3.1.bn1' },
  resnet18tdannsupervisedlw10: { face: 'layer4.1.bn1', body: 'layer4.1.bn1', scene: 'layer4.0.conv2' },
  resnet18tdannsimclrlw1: { face: 'layer4.1.conv1', body: 'layer4.1.bn1', scene: 'layer4.1.conv1' },
  resnet50imagenet1kv2: { face: 'layer4.0.relu3', body: 'layer3.3.bn1', scene: 'layer3.2.bn3' },
  resnet50openaiclip: { face: 'layer4.1.relu1', body: 'layer4.0.bn3', scene: 'layer4.2.relu3' },
  resnet50simclr: { face: 'avgpool', body: 'avgpool', scene: 'layer3.5.conv1' },
  resnet50robustl2eps3: { face: 'layer4.1.relu2', body: 'layer4.2.bn2', scene: 'layer4.1.conv1' },
  resnet50sin: { face: 'layer4.1.relu2', body: 'avgpool', scene: 'layer3.5.bn2' },
  resnet50ecoset: { face: 'layer4.0.conv3', body: 'layer4.1.conv2', scene: 'layer4.0.bn3' },
  resnet50faceobfuscation: { face: 'layer4.1.relu3', body: 'layer4.0.bn2', scene: 'layer3.4.bn1' },
  resnet50toponettau30: { face: 'layer4.1.relu3', body: 'avgpool', scene: 'avgpool' },
  resnet50cesslbarlowtop: { face: 'layer4.1.bn1', body: 'layer4.2.bn1', scene: 'layer4.1.bn2' },
  resnet50blurstrong: { face: 'layer4.1.relu2', body: 'avgpool', scene: 'avgpool' },
  resnet101imagenet1kv1: { face: 'layer3.22.relu1', body: 'avgpool', scene: 'layer3.14.conv2' },
  resnet101openaiclip: { face: 'layer4.1.relu1', body: 'layer3.11.bn3', scene: 'layer3.11.conv1' },
  bagnet33: { face: 'layer4.1.relu1', body: 'layer4.1.conv1', scene: 'layer4.0.conv3' },
  cornets: { face: 'V4.nonlin2', body: 'IT.norm3_0', scene: 'V4.norm1_3' },
  cornetz: { face: 'IT.pool', body: 'IT.pool', scene: 'IT.pool' },
  convnexttinyimagenet1kv1: { face: 'features.5.7.block.3', body: 'features.5.7.block.3', scene: 'features.5.2.block.3' },
  vitb32imagenet1kv1: { face: 'encoder.layers.encoder_layer_8.mlp', body: 'encoder.layers.encoder_layer_7.self_attention', scene: 'encoder.layers.encoder_layer_6.self_attention' },
  vitb32openaiclip: { face: 'transformer.resblocks.5.ln_2', body: 'transformer.resblocks.8.attn', scene: 'transformer.resblocks.6.attn' },
  vitb32dreamsimopenclip: { face: 'blocks.11.mlp', body: 'blocks.8.attn', scene: 'blocks.5.norm2' },
  vitb16imagenet21k: { face: 'blocks.8.attn', body: 'blocks.7.attn', scene: 'blocks.6.attn' },
  vitb16openaiclip: { face: 'transformer.resblocks.9.ln_1', body: 'transformer.resblocks.7.attn', scene: 'transformer.resblocks.6.attn' },
  vitb16siglip2res224: { face: 'trunk.blocks.8.norm1', body: 'trunk.blocks.6.attn', scene: 'trunk.blocks.6.mlp' },
  vitb16eva028bs8bb131k: { face: 'trunk.blocks.9.norm1', body: 'trunk.blocks.7.attn', scene: 'trunk.blocks.7.attn' },
  vitb16synclr: { face: 'blocks.6.norm2', body: 'blocks.11.norm2', scene: 'blocks.11.attn' },
  vitb14dinov2: { face: 'blocks.11.norm2', body: 'blocks.11.attn', scene: 'blocks.10.norm2' },
  vitb14dinov2reg: { face: 'blocks.8.attn', body: 'blocks.9.norm2', scene: 'blocks.7.mlp' },
  vitl14openaiclip: { face: 'transformer.resblocks.23.ln_1', body: 'transformer.resblocks.10.attn', scene: 'transformer.resblocks.13.attn' },
  vitl14kosmos2: { face: 'encoder.layers.22.mlp', body: 'encoder.layers.13.self_attn', scene: 'encoder.layers.13.layer_norm2' },
  alexnetmosaicmultiheadallvisual: { face: 'features.17', body: 'features.17', scene: 'features.17' },
  resnet18mosaicmultiheadallvisual: { face: 'features.7.0.bn2', body: 'features.7.1.conv2', scene: 'features.7.0.bn2' },
  squeezenetmosaicmultiheadallvisual: { face: 'features.12.squeeze', body: 'features.12.squeeze', scene: 'features.12.squeeze' },
  swintmosaicmultiheadallvisual: { face: 'features.8', body: 'features.5.0.mlp', scene: 'features.7.0.norm1' },
  alexnetrandom1: { face: 'features.12', body: 'features.12', scene: 'features.12' },
  alexnetrandom2: { face: 'features.12', body: 'features.12', scene: 'features.3' },
  alexnetrandom3: { face: 'features.5', body: 'features.12', scene: 'features.4' },
  alexnetrandom4: { face: 'features.12', body: 'features.12', scene: 'features.4' },
  alexnetrandom5: { face: 'features.12', body: 'features.12', scene: 'features.0' },
  resnet18random1: { face: 'layer1.0.conv2', body: 'layer4.1.conv1', scene: 'layer1.1.relu1' },
  resnet18random2: { face: 'layer1.0.bn2', body: 'layer4.1.bn2', scene: 'layer1.1.bn1' },
  resnet18random3: { face: 'layer1.1.conv2', body: 'layer4.1.conv1', scene: 'layer1.1.relu1' },
  resnet18random4: { face: 'layer1.0.conv2', body: 'layer4.1.relu1', scene: 'layer1.1.relu1' },
  resnet18random5: { face: 'layer2.1.bn2', body: 'layer4.1.conv1', scene: 'layer2.1.relu1' },
  resnet50random1: { face: 'layer1.1.bn2', body: 'layer4.2.conv2', scene: 'layer2.0.bn2' },
  resnet50random2: { face: 'layer1.0.conv1', body: 'layer4.2.conv3', scene: 'layer1.2.relu3' },
  resnet50random3: { face: 'layer1.0.bn1', body: 'layer4.2.bn2', scene: 'layer3.3.bn3' },
  resnet50random4: { face: 'layer1.0.conv1', body: 'layer4.2.conv2', scene: 'layer2.2.relu3' },
  resnet50random5: { face: 'layer1.0.bn1', body: 'layer4.2.conv3', scene: 'layer2.0.relu3' },
  vitb32random1: { face: 'encoder.layers.encoder_layer_2.mlp', body: 'encoder.layers.encoder_layer_7.self_attention', scene: 'encoder.layers.encoder_layer_10.ln_1' },
  vitb32random2: { face: 'encoder.layers.encoder_layer_11.mlp', body: 'encoder.layers.encoder_layer_5.self_attention', scene: 'encoder.layers.encoder_layer_0.mlp' },
  vitb32random3: { face: 'encoder.layers.encoder_layer_1.mlp', body: 'encoder.layers.encoder_layer_2.self_attention', scene: 'encoder.layers.encoder_layer_0.ln_1' },
  vitb32random4: { face: 'encoder.layers.encoder_layer_10.mlp', body: 'encoder.layers.encoder_layer_8.self_attention', scene: 'encoder.layers.encoder_layer_5.mlp' },
  vitb32random5: { face: 'encoder.layers.encoder_layer_9.mlp', body: 'encoder.layers.encoder_layer_9.self_attention', scene: 'encoder.layers.encoder_layer_10.ln_2' },
};

const UNTRAINED_MODELS = new Set([
  'alexnetrandom1','alexnetrandom2','alexnetrandom3','alexnetrandom4','alexnetrandom5',
  'resnet18random1','resnet18random2','resnet18random3','resnet18random4','resnet18random5',
  'resnet50random1','resnet50random2','resnet50random3','resnet50random4','resnet50random5',
  'vitb32random1','vitb32random2','vitb32random3','vitb32random4','vitb32random5',
]);

const TRAINED_MODELS = new Set(Object.keys(ORDERED_MODELS).filter(m => !UNTRAINED_MODELS.has(m)));
// Sort the trained models alphabetically by their display name
const SORTED_TRAINED_MODELS = Array.from(TRAINED_MODELS).sort((a, b) => {
  const nameA = ORDERED_MODELS[a].toUpperCase();
  const nameB = ORDERED_MODELS[b].toUpperCase();
  if (nameA < nameB) return -1;
  if (nameA > nameB) return 1;
  return 0;
});

const CAT_COLORS = {
  face:  ['#f09678', '#a7d6a1', '#a6d2e5', '#808080'],
  body:  ['#f09678', '#a7d6a1', '#a6d2e5', '#808080'],
  scene: ['#f09678', '#a7d6a1', '#a6d2e5', '#808080'],
};
const PREF_IDX = { face: 0, body: 1, scene: 2 };
const CAT_LABELS = ['Faces', 'Bodies', 'Scenes', 'Objects'];
const SHADE_COLOR = '#E6E6E6';

// Maps internal panel IDs → URL hash slugs.
// Edit the values here to customise the links shown in the address bar.
const PANEL_SLUGS = { // (slug values are used in the URL hash, e.g. #response-profiles)
  'cc-fig':      'figure1', // finding1-schematic
  'cc-demo':     'interactive-response-profiles',
  'f1-fig':      'figure2', // finding2-evidence
  'f1-demo':     'interactive-validate-selectivity',
  'f23-fig1':    'figure3', // finding3-evidence
  'f23-fig2':    'figure4', // finding3-robustness
  'f23-demo1':   'interactive-explore-gap',
  'f23-demo2':   'interactive-rdm',
  'f4-fig':      'figure5', // finding4-evidence
  'f4-demo':     'interactive-encoding-performance',
  'f5-fig':      'figure6', // finding5-evidence
  'f5-demo':     'interactive-interpretation',
};