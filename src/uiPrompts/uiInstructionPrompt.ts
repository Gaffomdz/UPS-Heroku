import * as ui from '@dcl/ui-scene-utils'

export let createUiInstructionPrompt = new ui.CustomPrompt(ui.PromptStyles.LIGHTLARGE, 966,466)
createUiInstructionPrompt.canvas = new UICanvas()
createUiInstructionPrompt.background.source = (new Texture("images/Instruccions/instructions_fixed.png")) //add rebeca design here
createUiInstructionPrompt.background.height = 466//395
createUiInstructionPrompt.background.width = 966//924
createUiInstructionPrompt.background.hAlign = 'center'
createUiInstructionPrompt.background.vAlign = 'center'
createUiInstructionPrompt.background.sourceHeight = 1864//395
createUiInstructionPrompt.background.sourceWidth = 3867//924
createUiInstructionPrompt.closeIcon.visible = true
createUiInstructionPrompt.closeIcon.positionX = 435
createUiInstructionPrompt.closeIcon.positionY = 185
createUiInstructionPrompt.hide()