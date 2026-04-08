import bpy
import bmesh
import math
import mathutils
import sys
from pathlib import Path

DEFAULT_BLEND = Path('/Users/noahwilliams/Downloads/uploads_files_5232169_FlipClock.blend')
DEFAULT_OUT = Path('/tmp/retro-flip-clock-shell.glb')


def cli_output_path() -> Path:
    if '--' not in sys.argv:
      return DEFAULT_OUT

    args = sys.argv[sys.argv.index('--') + 1 :]
    if not args:
      return DEFAULT_OUT

    return Path(args[0]).expanduser()


OUT_GLB = cli_output_path()

bpy.ops.wm.open_mainfile(filepath=str(DEFAULT_BLEND))
scene = bpy.context.scene
source_clock = bpy.data.objects['FlipClock']
clock = source_clock.copy()
clock.data = source_clock.data.copy()
clock.name = 'FlipClockShell'
scene.collection.objects.link(clock)
mesh = clock.data

for obj in list(scene.objects):
    if obj is clock:
        continue
    bpy.data.objects.remove(obj, do_unlink=True)

clock_numbers_index = next(
    i for i, material in enumerate(mesh.materials) if material and material.name == 'ClockNumbers'
)
clock_black_index = next(
    i for i, material in enumerate(mesh.materials) if material and material.name == 'ClockBlack'
)

bm = bmesh.new()
bm.from_mesh(mesh)
bm.faces.ensure_lookup_table()

clock_number_faces = [face for face in bm.faces if face.material_index == clock_numbers_index]
clock_black_faces = [face for face in bm.faces if face.material_index == clock_black_index]
clock_black_verts = [clock.matrix_world @ vert.co for face in clock_black_faces for vert in face.verts]

black_min = mathutils.Vector(
    (
        min(vert.x for vert in clock_black_verts),
        min(vert.y for vert in clock_black_verts),
        min(vert.z for vert in clock_black_verts),
    )
)
black_max = mathutils.Vector(
    (
        max(vert.x for vert in clock_black_verts),
        max(vert.y for vert in clock_black_verts),
        max(vert.z for vert in clock_black_verts),
    )
)

bmesh.ops.delete(bm, geom=clock_number_faces, context='FACES')
bm.to_mesh(mesh)
bm.free()
mesh.update()


def ensure_principled_material(
    name: str,
    color: tuple[float, float, float, float],
    roughness: float,
):
    material = bpy.data.materials.get(name)
    if material is None:
        material = bpy.data.materials.new(name)
    material.use_nodes = True
    nodes = material.node_tree.nodes
    links = material.node_tree.links
    for node in list(nodes):
        nodes.remove(node)
    output = nodes.new('ShaderNodeOutputMaterial')
    bsdf = nodes.new('ShaderNodeBsdfPrincipled')
    bsdf.inputs['Base Color'].default_value = color
    bsdf.inputs['Roughness'].default_value = roughness
    bsdf.inputs['Metallic'].default_value = 0.0
    links.new(bsdf.outputs['BSDF'], output.inputs['Surface'])
    return material


back_panel_material = ensure_principled_material('ClockBackPanelMat', (0.015, 0.016, 0.012, 1.0), 1.0)
shadow_material = ensure_principled_material('ClockInnerShadowMat', (0.04, 0.04, 0.03, 1.0), 1.0)

center = (black_min + black_max) * 0.5
size = black_max - black_min
panel_depth = size.x * 0.26
panel_width = size.y * 0.84
panel_height = size.z * 0.54


def add_box(name: str, location: tuple[float, float, float], dimensions: tuple[float, float, float], material):
    bpy.ops.mesh.primitive_cube_add(location=location)
    obj = bpy.context.active_object
    obj.name = name
    obj.scale = (dimensions[0] * 0.5, dimensions[1] * 0.5, dimensions[2] * 0.5)
    obj.data.materials.clear()
    obj.data.materials.append(material)
    return obj


panel_center_x = black_min.x + size.x * 0.34
panel_center_z = center.z - size.z * 0.01
add_box(
    'ClockBackPanel',
    (panel_center_x, center.y, panel_center_z),
    (panel_depth, panel_width, panel_height),
    back_panel_material,
)
add_box(
    'ClockTopRail',
    (panel_center_x + size.x * 0.07, center.y, panel_center_z + panel_height * 0.49),
    (size.x * 0.11, panel_width * 1.02, panel_height * 0.18),
    shadow_material,
)
add_box(
    'ClockBottomRail',
    (panel_center_x + size.x * 0.07, center.y, panel_center_z - panel_height * 0.49),
    (size.x * 0.11, panel_width * 1.02, panel_height * 0.18),
    shadow_material,
)

scene.frame_start = 1
scene.frame_end = 1
scene.frame_set(1)

bpy.ops.export_scene.gltf(
    filepath=str(OUT_GLB),
    export_format='GLB',
    use_selection=False,
    export_yup=True,
    export_texcoords=True,
    export_normals=True,
    export_materials='EXPORT',
    export_animations=False,
    export_image_format='AUTO',
    export_apply=False,
)

print(OUT_GLB)
