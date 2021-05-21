from bll.FaceMorph.faceMorph import FaceMorph
from bll.FaceSwap.faceSwap import FaceSwap
from bll.FunnyMirrors.FunnyMirrorsImages import FunnyMirrors
from object_access_file import Object_Access

class LogicLayer:

	def __init__(self):
		self._oa = Object_Access()

	def face_morph(self,img1,img2):
		return FaceMorph.main(img1,img2)

	def face_swap(self,img1,img2):
		return FaceSwap.main(img1,img2)

	def funny_mirrors(self,img,effect):
		return FunnyMirrors.main(img,effect)