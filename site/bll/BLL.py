from BLL.FaceMorph.faceMorph import FaceMorph
from BLL.FaceSwap.faceSwap import FaceSwap
from BLL.FunnyMirrors.FunnyMirrorsImages import FunnyMirrors
from DAL.DOM.DOM import DataObjectModel

class BusinessLogicLayer:

	def __init__(self):
		self._oa = DataObjectModel()

	def face_morph(self,img1,img2):
		return FaceMorph.main(img1,img2)

	def face_swap(self,img1,img2):
		return FaceSwap.main(img1,img2)

	def funny_mirrors(self,img,effect):
		return FunnyMirrors.main(img,effect)