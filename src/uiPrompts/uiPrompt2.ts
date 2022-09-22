import * as ui from '@dcl/ui-scene-utils'

export let createUiPrompt2 = new ui.CustomPrompt(ui.PromptStyles.LIGHTLARGE, 1067, 533)
createUiPrompt2.canvas = new UICanvas()
createUiPrompt2.background.source = (new Texture("")) //add rebeca design here
createUiPrompt2.background.height = 533
createUiPrompt2.background.width = 1067
createUiPrompt2.background.hAlign = 'center'
createUiPrompt2.background.vAlign = 'center'
createUiPrompt2.background.sourceHeight = 2134
createUiPrompt2.background.sourceWidth = 4267
createUiPrompt2.closeIcon.visible = true
createUiPrompt2.closeIcon.positionX = 450
createUiPrompt2.closeIcon.positionY = 180
createUiPrompt2.hide()