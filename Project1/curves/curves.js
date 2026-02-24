import * as THREE from "three";
export const curves = {
    arcCurve : () => {
        const curve = new THREE.ArcCurve(1, 1, 2, 0, 2*Math.PI);
        const points = curve.getPoints(100);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
        const line = new THREE.Line(geometry, material);
        return { line, curve };
    },
    catmullRomCurve3: () => {
        const points = [
            new THREE.Vector3(-10, 0, 10),
            new THREE.Vector3(-5, 5, 5),
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(5, -5, 5),
            new THREE.Vector3(10, 0, 10)
        ];
        const curve = new THREE.CatmullRomCurve3(points, true);
        const curvePoints = curve.getPoints(100);
        const geometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
        const material = new THREE.LineBasicMaterial({ color: 0x00ff00 });
        const line = new THREE.Line(geometry, material);
        return { line, curve };
    },
    ellipseCurve: () => {
        const curve = new THREE.EllipseCurve(0, 0, 5, 3, 0, 2*Math.PI);
        const points = curve.getPoints(100);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
        const ellipse = new THREE.Line(geometry, material);
        return { ellipse, curve };
    },
    cubicBezierCurve: () => {
        const curve = new THREE.CubicBezierCurve3(
            new THREE.Vector3(-10, 0, 0),
            new THREE.Vector3(-5, 15, 0),
            new THREE.Vector3(5, -15, 5),
            new THREE.Vector3(10, 0, 0)
        );
        const points = curve.getPoints(100);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: 0xffff00 });
        const bezier = new THREE.Line(geometry, material);
        return { bezier, curve };
    },
    splineCurve: () => {
        const points = [
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(10, 5, 0),
            new THREE.Vector3(20, 0, 0),
            new THREE.Vector3(30, 5, 0)
        ];
        const curve = new THREE.SplineCurve(points);
        const curvePoints = curve.getPoints(100);
        const geometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
        const material = new THREE.LineBasicMaterial({ color: 0xff00ff });
        const spline = new THREE.Line(geometry, material);
        return { spline, curve };
    }
};