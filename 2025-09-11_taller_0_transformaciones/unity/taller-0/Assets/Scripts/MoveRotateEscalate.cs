using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MoveRotateEscalate : MonoBehaviour
{
    public float moveInterval = 2f;   // cada cuántos segundos cambia de posición
    public float moveDistance = 2f;   // cuánto se mueve en cada salto
    public float rotationSpeed = 90f; // grados por segundo
    public float scaleAmplitude = 0.3f;
    public float baseScale = 1f;

    private float nextMoveTime;

    void Start()
    {
        nextMoveTime = Time.time + moveInterval;
    }

    void Update()
    {
        // --- Traslación aleatoria por X o Y ---
        if (Time.time >= nextMoveTime)
        {
            // elige eje aleatorio: 0 = X, 1 = Y
            int axis = Random.Range(0, 2);
            Vector3 move = Vector3.zero;
            if (axis == 0) move = new Vector3(moveDistance, 0, 0);
            else move = new Vector3(0, moveDistance, 0);

            transform.Translate(move, Space.World);
            nextMoveTime = Time.time + moveInterval;
        }

        // --- Rotación constante ---
        transform.Rotate(Vector3.up * rotationSpeed * Time.deltaTime);

        // --- Escalado oscilante ---
        float scale = baseScale + Mathf.Sin(Time.time) * scaleAmplitude;
        transform.localScale = new Vector3(scale, scale, scale);
    }
}

